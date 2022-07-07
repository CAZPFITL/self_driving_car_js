import {lerp, getIntersection} from './utils.js';

export class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 150;
        this.raySpread = Math.PI * 0.5;

        this.rays = [];
        this.readings = [];
    }

    // push all rays to this.rays
    #castRays() {
        this.rays = [];
        // loop to get all the rayCount iterations of the rays
        for (let i = 0; i < this.rayCount; i++) {
            // get the angle of the ray
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
            ) + this.car.angle;
            // get start drawing point
            const start = {x: this.car.x, y: this.car.y - this.car.heightReference};
            // get end drawing points
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }
            // push the ray to this.rays
            this.rays.push([start, end]);
        }
    }

    // get all touches and return the closest one
    #getReading(ray, roadBorders) {
        let touches = [];

        roadBorders.forEach(border => {
            // getIntersection returns { x, y, offset }
            const touch = getIntersection(
                ray[0],
                ray[1],
                border[0],
                border[1]
            );
            if (touch) {
                touches.push(touch);
            }
        })


        return (touches.length === 0) ?
            null :
            touches.reduce((a, b) => {
                return a.offset < b.offset ? a.offset : b.offset;
            });
    }

    // get all readings of the sensor
    #getReadings(roadBorders) {
        this.readings = [];
        this.rays.forEach(ray => {
            this.readings.push(
                this.#getReading(ray, roadBorders)
            );
        });
    }

    // draw a single line
    #drawRay({ctx, ray, i}, color, n) {
        let end = this.readings[i] ?? ray[1];

        // ray drawing
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.moveTo(
            ray[n].x,
            ray[n].y
        );
        ctx.lineTo(
            end.x,
            end.y
        );
        ctx.stroke();
    }

    //loop through all the rays to draw them
    #drawRays(ctx) {
        this.rays.forEach((ray, i) => {
            this.#drawRay({ctx, ray, i}, 'yellow', 0);
            this.#drawRay({ctx, ray, i}, 'black', 1);
        })
    }

    // get the readings of each one the rays
    update(roadBorders) {
        this.#castRays();
        this.#getReadings(roadBorders);
    }

    draw(ctx) {
        this.#drawRays(ctx)
    }
}
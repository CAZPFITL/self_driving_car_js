import {lerp, colors, getIntersection} from './utils.js';

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
            const start = {x: this.car.x, y: this.car.y};
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
    #getReading(ray, roadBorders, traffic) {
        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            // getIntersection returns { x, y, offset }
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if (touch) {
                touches.push(touch);
            }
        }
        // get reading of traffic
        for (let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;
            for (let j = 0; j < poly.length; j++) {
                const value = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j + 1) % poly.length]
                );
                if (value) {
                    touches.push(value);
                }
            }
        }
        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(touch => touch.offset === minOffset);
        }
    }

    // get all readings of the sensor
    #getReadings(roadBorders, traffic) {
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(this.#getReading(this.rays[i], roadBorders, traffic));
        }
    }

    // draw a single line
    #drawRay(gameCtx, ray, i, color, n) {
        let end = this.readings[i] ?? ray[1];

        // ray drawing
        gameCtx.beginPath();
        gameCtx.lineWidth = 2;
        gameCtx.strokeStyle = color;
        gameCtx.moveTo(
            ray[n].x,
            ray[n].y
        );
        gameCtx.lineTo(
            end.x,
            end.y
        );
        gameCtx.stroke();
    }

    //loop through all the rays to draw them
    #drawRays(gameCtx) {
        for (let i = 0; i < this.rays.length; i++) {
            this.#drawRay(gameCtx, this.rays[i], i, colors[5], 0);
            this.#drawRay(gameCtx, this.rays[i], i, colors[4], 1);
        }
    }

    // get the readings of each one the rays
    update(roadBorders, traffic) {
        this.#castRays();
        this.#getReadings(roadBorders, traffic);
    }

    draw(gameCtx) {
        this.#drawRays(gameCtx)
    }
}
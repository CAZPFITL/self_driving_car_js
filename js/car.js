import {Controls} from './controls.js';
import {Sensor} from './sensor.js';
import {models} from './models.js';
import {colors, getTurnRatio, polysIntersect, random} from './utils.js';
import {NeuralNetwork} from "./network.js";

// Car to be trained
export class Car {
    constructor({id = 0, x, y, model, control = false, color = colors[2]}) {
        this.name = 'Car-' + model + ' #' + id;
        // position and size
        this.x = x;
        this.y = y;
        // sense
        if (control) {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
            console.log(this.brain)
        }
        // control
        this.controls = new Controls(control);
        // model
        this.#getModelData(control, model, color);
    }

    #getModelData(control, model, color) {
        this.speed = 0;
        this.angle = 0;
        this.damaged = false;

        this.model = model;
        this.color = color;
        // TODO: randomize speed and avoid coalitions on traffic
        this.maxSpeed = !control ? (models[this.model].maxSpeed * 0.6 * random(1, 1)) : models[this.model].maxSpeed;
        this.friction = models[this.model].friction;

        this.turnRatio = getTurnRatio(models[this.model]);
        this.acceleration = models[this.model].acceleration;

        this.model_polygons = models[this.model].polygons;
    }

    #move() {
        // add acceleration to speed
        (this.controls.forward) && (this.speed += this.acceleration);
        (this.controls.reverse) && (this.speed -= this.acceleration);

        // add speed limiter
        (this.speed > this.maxSpeed) && (this.speed = this.maxSpeed);
        (this.speed < -this.maxSpeed / 2) && (this.speed = -this.maxSpeed / 2);

        // add friction and absolute repose in lower ranges
        (this.speed > 0) && (this.speed -= this.friction);
        (this.speed < 0) && (this.speed += this.friction);
        (this.speed < 0.1 && this.speed > -0.1) && (this.speed = 0);

        // add direction changing the value of angle
        // TODO improve the lateral friction at high speeds
        if (this.speed !== 0) {
            const lateralFriction = (this.speed / this.turnRatio);
            (this.controls.left && this.speed !== 0) && (this.angle += lateralFriction);
            (this.controls.right && this.speed !== 0) && (this.angle -= lateralFriction);
        }

        // this works under the unit circle logic using sin or cos multiplied by speed to get the translation
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    #createPolygon() {
        this.polygon = [];
        const points = this.model_polygons(this);
        for (let i = 0; i < points.length; i++) {
            this.polygon.push(points[i]);
        }
    }

    #assesDamage(roadBorders, traffic) {
        // TODO: fix this polygon thing to use a for inside a for and receive an array as parameter
        for (let i = 0; i < roadBorders.length; i++) {
            if (polysIntersect(this.polygon, roadBorders[i]))
                return true;
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon))
                return true;
        }
        return false;
    }

    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.#createPolygon();
            this.damaged = this.#assesDamage(roadBorders, traffic);
        }
        if (this.sensor){
            this.sensor.update(roadBorders, traffic);
            const offsets = this.sensor.readings.map(reading => reading==null ? 0 : 1 - reading.offset );
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
            console.log(outputs);
        }
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fillStyle = this.damaged ? colors[3] : color;
        ctx.fill()
        this.sensor && this.sensor.draw(ctx);
    }
}

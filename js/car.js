import {Controls} from './controls.js';
import {Sensor} from './sensor.js';
import {models} from './models.js';

// Car to be trained
export class Car {
    constructor({id = 0, x, y, width, height, model}) {
        this.name = 'Car-' + model + ' #' + id;
        // position and size
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.model = model;
        // sense
        this.sensor = new Sensor(this);
        // control
        this.controls = new Controls();
        // model
        this.#getModelData();
    }

    #getModelData() {
        this.speed = 0;
        this.angle = 0;
        this.maxSpeed = models[this.model].maxSpeed;
        this.friction = models[this.model].friction;
        this.turnRatio = models[this.model].turnRatio;
        this.acceleration = models[this.model].acceleration;
        this.calculated_radius = Math.hypot(this.width, this.height) * 0.4;
        this.calculated_angle = Math.atan2(this.width, this.height);
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
        points.forEach(point => this.polygon.push(point))
    }

    update(roadBorders) {
        this.#move();
        this.#createPolygon();
        this.sensor.update(roadBorders);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill()
        this.sensor.draw(ctx);
    }
}

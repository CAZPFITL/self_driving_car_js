import {Controls} from './controls.js';
import {Sensor} from './sensor.js';

// Car to be trained
export class Car {
    constructor({id = 0, x, y, width, height}) {
        this.name = 'Car #' + id;
        // position and size
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // movement
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.heightReference = - height / 2;
        // sense
        this.sensor = new Sensor(this);
        // control
        this.controls = new Controls();
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
            const lateralFriction = (this.speed * 0.02 * 0.5);
            (this.controls.left && this.speed !== 0) && (this.angle += lateralFriction);
            (this.controls.right && this.speed !== 0) && (this.angle -= lateralFriction);
        }

        // this works under the unit circle logic using sin or cos multiplied by speed to get the translation
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    #createPolygon() {
        this.polygon = [];
        const radius = Math.hypot(this.width, this.height) * 0.5;
        const angle = Math.atan2(this.width, this.height);
        this.polygon.push({
            x: this.x - Math.sin(this.angle - angle) * radius,
            y: this.y - Math.cos(this.angle - angle) * radius
        })
        this.polygon.push({
            x: this.x - Math.sin(this.angle + angle) * radius,
            y: this.y - Math.cos(this.angle + angle) * radius
        })
        this.polygon.push({
            x: this.x - Math.sin(Math.PI + this.angle - angle) * radius,
            y: this.y - Math.cos(Math.PI + this.angle - angle) * radius
        })
        this.polygon.push({
            x: this.x - Math.sin(Math.PI + this.angle + angle) * radius,
            y: this.y - Math.cos(Math.PI + this.angle + angle) * radius
        })
    }

    update(roadBorders) {
        this.#move();
        this.#createPolygon();
        this.sensor.update(roadBorders);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y - this.heightReference);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y - this.heightReference);
        }
        ctx.fill()
        this.sensor.draw(ctx);
    }
}

import {Controls} from './controls.js';
import {Sensor} from './sensor.min.js';

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

    update() {
        this.#move();
        this.sensor.update();
    }

    draw(ctx) {
        // save the car's context
        ctx.save()

        // translate the cars position to the cars x and y reference
        ctx.translate(this.x, this.y);

        // rotate to angle's rate
        ctx.rotate(-this.angle);

        // draw the car
        // (position is already established in the previous steps, so we don't need to specify it in here.
        // we just need remove the half size measures to the actual position)
        ctx.beginPath();
        ctx.rect(
            -this.width * 0.5,
            -this.height * 0.8,
            this.width,
            this.height
        );
        ctx.fill()

        // restore car's context
        ctx.restore();

        this.sensor.draw(ctx);
    }
}

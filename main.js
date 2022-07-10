import {processCtx, drawEntities, getCanvas} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';

// create the canvas
const {canvas, ctx, factory} = getCanvas(200);

// create the road
const road = new Road({ x: canvas.width / 2, width: canvas.width * 0.9 });

// create the car
const car = new Car({ x: road.getLaneCenter(1), y: 100, model: 'sedan', control: true });

// create traffic
const traffic = [
    new Car({ x: road.getLaneCenter(1), y: -100, model: 'sedan' }),
    new Car({ x: road.getLaneCenter(0), y: 80, model: 'sedan' }),
    new Car({ x: road.getLaneCenter(2), y: 10, model: 'sedan' }),
    new Car({ x: road.getLaneCenter(2), y: 120, model: 'sedan' })
]

// animate logic
const animate = () => {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, 'purple');
    }
    car.draw(ctx, 'blue');

    // restore context & requestAnimationFrame
    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

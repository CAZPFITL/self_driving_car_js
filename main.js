import {getCanvas} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';

// create the canvas
const {canvas, ctx, factory} = getCanvas(200);

// create the road
const road = factory.create(Road, {
    x: canvas.width / 2,
    width: canvas.width * 0.9
});

// create the car
const car = factory.create(Car, {
    x: road.getLaneCenter(1),
    y: 100,
    width: road.getLaneWidth() * 0.6,
    height: road.getLaneWidth()
});

// animate logic
const animate = () => {
    car.update();
    canvas.height = window.innerHeight;

    const yTranslation = -car.y + canvas.height / 2;

    ctx.save();
    ctx.translate(0, yTranslation);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

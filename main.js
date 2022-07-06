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
    // run car's main update logic
    car.update();
    canvas.height = window.innerHeight;

    // car translation over the canvas
    const yTranslation = -car.y + canvas.height * 0.7;
    // save context
    ctx.save();
    // translate the context in base of the car's position using yTranslation and canvas height as references.
    ctx.translate(0, yTranslation);

    // draw entities
    road.draw(ctx);
    car.draw(ctx);

    // restore context & requestAnimationFrame
    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

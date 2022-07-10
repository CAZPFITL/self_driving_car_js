import {processCtx, drawEntities, getCanvas} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';

// create the canvas
const {canvas, ctx, factory} = getCanvas(200);

// create the road
const road = factory.create(Road, {
    x: canvas.width / 2,
    width: canvas.width * 0.9
});

const model = 'sedan';

// create the car
const car = factory.create(Car, {
    x: road.getLaneCenter(1),
    y: 100,
    model
});

// animate logic
const animate = () => {
    car.update(road.borders);
    processCtx(canvas, ctx, car);
    drawEntities(ctx, [road, car], animate);
}

animate();

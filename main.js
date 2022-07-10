import {colors, random, processCtx, drawEntities, getCanvas} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';

// main request
var request;

// create the canvas
const {canvas, ctx, factory} = getCanvas(200);

// create the road
const road = new Road({x: canvas.width / 2, width: canvas.width * 0.9});

// create the car
const car = new Car({x: road.getLaneCenter(1), y: 100, model: 'sedan', control: true, color: colors[2]});

// create traffic
// TODO: create traffic generator
const traffic = [
    new Car({x: road.getLaneCenter(0), y: -300, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(1), y: -100, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(2), y: -300, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),

    new Car({x: road.getLaneCenter(0), y: -700, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(1), y: -500, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(2), y: -700, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),

    new Car({x: road.getLaneCenter(0), y: -1100, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(1), y: -900, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(2), y: -1100, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),

    new Car({x: road.getLaneCenter(0), y: -1500, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(1), y: -1300, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(2), y: -1500, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),

    new Car({x: road.getLaneCenter(0), y: -1900, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(1), y: -1700, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(2), y: -1900, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),

    new Car({x: road.getLaneCenter(0), y: -2300, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(1), y: -2100, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
    new Car({x: road.getLaneCenter(2), y: -2300, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]})
]

// animate logic
const animate = () => {
    // update the cars (provide data to the cars)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    // canvas process
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);
    // draw the road
    road.draw(ctx);
    // draw the traffic
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, traffic[i].color);
    }
    // draw player car
    car.draw(ctx, colors[2]);
    // ctx restore & request animation frame
    ctx.restore();
    request = requestAnimationFrame(animate);
    // cancel the request if the user leaves the page (temporal)
    (car.damaged) && cancelAnimationFrame(request);
}

request = requestAnimationFrame(animate);


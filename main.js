import {colors, updateEntities, processCtx, drawEntities, getCanvas, random} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';
import {trafficData} from './js/traffic.js';
import {Visualizer} from "./js/visualizer.js";

// main request
var request;

// create the gameCanvas
const {gameCanvas, gameCtx, networkCanvas, networkCtx, factory} = getCanvas(200);

// create the road
const road = factory.create(Road, {x: gameCanvas.width / 2, width: gameCanvas.width * 0.9});

// create the car
// TODO change the car to a const when finish the debug stage
window.car = factory.create(Car, {x: road.getLaneCenter(1), y: 100, model: 'sedan', control: 'AI', color: colors[2]});

// create traffic
const traffic = trafficData(road).map(({x, y}) =>
    factory.create(Car, {x, y, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]}),
);

// animate logic
const animate = () => {
    updateEntities({road, car, traffic});
    processCtx({
        gameCanvas,
        gameCtx,
        networkCanvas,
        networkCtx,
        car
    });
    drawEntities(gameCtx, [road, traffic, car]);
    // gameCtx restore & request animation frame
    gameCtx.restore();
    Visualizer.drawNetwork(networkCtx, car.brain);
    request = requestAnimationFrame(animate);
    // cancel the request if the user leaves the page (temporal)
    // (car.damaged) && cancelAnimationFrame(request);
}

request = requestAnimationFrame(animate);


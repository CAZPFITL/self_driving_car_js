import {colors, updateEntities, processCtx, drawEntities, getCanvas, random} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';
import {trafficData} from './js/traffic.js';
import {Visualizer} from "./js/visualizer.js";

function generateCars(N) {
    const cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(factory.create(Car, {x: road.getLaneCenter(1), y: 100, model: 'sedan', control: 'AI', color: colors[2]}));
    }
    return cars;
}

// main request
var request;

// create the gameCanvas
const {gameCanvas, gameCtx, networkCanvas, networkCtx, factory} = getCanvas(200);

// create the road
const road = factory.create(Road, {x: gameCanvas.width / 2, width: gameCanvas.width * 0.9});

// create the car
// TODO change the car to a const when finish the debug stage
const N = 200;
window.cars = generateCars(N)
window.bestCar = cars[0].brain;
if (localStorage.getItem('bestBrain')) {
    console.log(localStorage.getItem('bestBrain'));
}
// create traffic
const traffic = trafficData(road).map(({x, y}) =>
    factory.create(Car, {x, y, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]})
);

window.save = () => {
    localStorage.setItem('bestBrain', JSON.stringify(window.bestCar.brain));
    console.log('localStorage', localStorage);
    console.log(window.bestCar, 'saved');
}

window.discard = () => {
    localStorage.removeItem('bestBrain');
}
// animate logic
const animate = (time) => {
    window.bestCar = cars.find(car => car.y === Math.min(...cars.map(car => car.y)));

    // update the entities providing data to them
    updateEntities({road, cars, traffic});
    // process the ctx
    processCtx({
        gameCanvas,
        gameCtx,
        networkCanvas,
        networkCtx,
        bestCar
    });

    // draw the entities
    drawEntities(gameCtx, [road, traffic, cars], bestCar);

    // gameCtx restore & request animation frame
    gameCtx.restore();
    // Animate Line-dash
    networkCtx.lineDashOffset = - time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    request = requestAnimationFrame(animate);
}

request = requestAnimationFrame(animate);


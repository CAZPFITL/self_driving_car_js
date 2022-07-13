import {
    colors,
    updateEntities,
    processCtx,
    drawEntities,
    getCanvas,
    random,
    generateCars
} from './js/utils.js';
import {Car} from './js/car.js';
import {Road} from './js/road.js';
import {trafficData} from './js/traffic.js';
import {Visualizer} from "./js/visualizer.js";
import {NeuralNetwork} from "./js/network.js";


// main request
var request;

// create the gameCanvas
const {gameCanvas, gameCtx, networkCanvas, networkCtx, factory} = getCanvas(200);

// create the road
const road = factory.create(Road, {x: gameCanvas.width / 2, width: gameCanvas.width * 0.9});

// create the car
// TODO change the car to a const when finish the debug stage
window.cars = generateCars(factory, road, 50)
window.bestCar = cars[0].brain;

if (localStorage.getItem('bestBrain')) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
}

// create traffic
const traffic = trafficData(road).map(({x, y}) =>
    factory.create(Car, {x, y, model: 'sedan', color: colors[Math.floor(random(5, colors.length))]})
);

window.save = () => {
    localStorage.setItem('bestBrain', JSON.stringify(window.bestCar.brain));
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
    networkCtx.lineDashOffset = -time / 500;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    request = requestAnimationFrame(animate);
}

request = requestAnimationFrame(animate);


import {f1} from './polygons.js';

export const models = {
    sedan: {
        acceleration: 0.2,
        maxSpeed: 4,
        friction: 0.05,
        polygons: function (context) {
            const radius = 28;
            const lambda = 0.45;
            const output = [
                // top right point
                {
                    x: context.x - Math.sin(context.angle - lambda) * radius,
                    y: context.y - Math.cos(context.angle - lambda) * radius
                },
                // top left point
                {
                    x: context.x - Math.sin(context.angle + lambda) * radius,
                    y: context.y - Math.cos(context.angle + lambda) * radius
                },
                // bottom left point
                {
                    x: context.x - Math.sin(Math.PI + context.angle - lambda) * radius,
                    y: context.y - Math.cos(Math.PI + context.angle - lambda) * radius
                },
                // bottom right point
                {
                    x: context.x - Math.sin(Math.PI + context.angle + lambda) * radius,
                    y: context.y - Math.cos(Math.PI + context.angle + lambda) * radius
                }
            ]
            return output;
        }
    },
    f1: {
        acceleration: 0.25,
        maxSpeed: 6,
        friction: 0.035,
        polygons: function (context) {
            const unit = 75
            // we need to rotate the polygon around the center of the car so we add 90 degrees to the angle
            return f1.map(point => ({
                    x: context.x - Math.sin(context.angle - point.lambda + 0.9) * unit * point.radius,
                    y: context.y - Math.cos(context.angle - point.lambda + 0.9) * unit * point.radius
                }))
        }
    }
};
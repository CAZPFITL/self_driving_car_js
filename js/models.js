export const models = {
    sedan: {
        // TODO calculate ratio in base of friction and acceleration
        acceleration: 0.2,
        maxSpeed: 3,
        friction: 0.05,
        turnRatio: 100,
        polygons: (context) => [
            // top right point
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(context.angle - context.calculated_angle) * context.calculated_radius
            },
            // top left point
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(context.angle + context.calculated_angle) * context.calculated_radius
            },
            // bottom left point
            {
                x: context.x - Math.sin(Math.PI + context.angle - context.calculated_angle * 1) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle - context.calculated_angle * 1) * context.calculated_radius
            },
            // bottom right point
            {
                x: context.x - Math.sin(Math.PI + context.angle + context.calculated_angle * 1) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle + context.calculated_angle * 1) * context.calculated_radius
            }
        ]
    },
    sport: {
        acceleration: 0.22,
        maxSpeed: 6,
        friction: 0.04,
        turnRatio: 200,
        polygons: (context) => [
            // top right point
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(context.angle - context.calculated_angle) * context.calculated_radius
            },
            // top left point
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(context.angle + context.calculated_angle) * context.calculated_radius
            },
            // bottom left point
            {
                x: context.x - Math.sin(Math.PI + context.angle - context.calculated_angle * 2) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle - context.calculated_angle * 2) * context.calculated_radius
            },
            // bottom left point
            {
                x: context.x - Math.sin(Math.PI + context.angle - context.calculated_angle * 1) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle - context.calculated_angle * 1) * context.calculated_radius
            },
            // bottom right point
            {
                x: context.x - Math.sin(Math.PI + context.angle + context.calculated_angle * 1) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle + context.calculated_angle * 1) * context.calculated_radius
            },
            // bottom right point
            {
                x: context.x - Math.sin(Math.PI + context.angle + context.calculated_angle * 2) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle + context.calculated_angle * 2) * context.calculated_radius
            }
        ]
    }
};
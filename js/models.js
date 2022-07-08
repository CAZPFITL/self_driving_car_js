export const models = {
    sedan: {
        acceleration: 0.2,
        maxSpeed: 3,
        friction: 0.05,
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
        friction: 0.045,
        polygons: (context) => [
            // MIDDLE RIGHT SECTION
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle - 0.5) * context.calculated_radius * 0.65,
                y: context.y - Math.cos(context.angle - context.calculated_angle - 0.5) * context.calculated_radius * 0.65
            },
            // MIDDLE TOP SECTION
            // top right point
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(context.angle - context.calculated_angle) * context.calculated_radius
            },
            // top right internal point
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle + 0.2) * (context.calculated_radius * 1.2),
                y: context.y - Math.cos(context.angle - context.calculated_angle + 0.2) * (context.calculated_radius * 1.2)
            },
            // top right aileron back point
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle + 0.1) * (context.calculated_radius * 1.25),
                y: context.y - Math.cos(context.angle - context.calculated_angle + 0.1) * (context.calculated_radius * 1.25)
            },
            // top right aileron front point
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle + 0.16) * (context.calculated_radius * 1.5),
                y: context.y - Math.cos(context.angle - context.calculated_angle + 0.16) * (context.calculated_radius * 1.5)
            },
            // top
            {
                x: context.x - Math.sin(context.angle - context.calculated_angle + 0.55) * (context.calculated_radius * 1.5),
                y: context.y - Math.cos(context.angle - context.calculated_angle + 0.55) * (context.calculated_radius * 1.5)
            },
            // top left aileron front point
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle - 0.16) * (context.calculated_radius * 1.5),
                y: context.y - Math.cos(context.angle + context.calculated_angle - 0.16) * (context.calculated_radius * 1.5)
            },
            // top left aileron back point
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle - 0.1) * (context.calculated_radius * 1.25),
                y: context.y - Math.cos(context.angle + context.calculated_angle - 0.1) * (context.calculated_radius * 1.25)
            },
            // top left internal point
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle - 0.2) * (context.calculated_radius * 1.2),
                y: context.y - Math.cos(context.angle + context.calculated_angle - 0.2) * (context.calculated_radius * 1.2)
            },
            // top left point
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(context.angle + context.calculated_angle) * context.calculated_radius
            },
            // MIDDLE LEFT SECTION
            {
                x: context.x - Math.sin(context.angle + context.calculated_angle + 0.5) * context.calculated_radius * 0.65,
                y: context.y - Math.cos(context.angle + context.calculated_angle + 0.5) * context.calculated_radius * 0.65
            },
            // MIDDLE BOTTOM SECTION
            // bottom left point
            {
                x: context.x - Math.sin(Math.PI + context.angle - context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle - context.calculated_angle) * context.calculated_radius
            },
            // bottom left internal point
            {
                x: context.x - Math.sin(Math.PI + context.angle - context.calculated_angle + 0.3) * context.calculated_radius * 1.2,
                y: context.y - Math.cos(Math.PI + context.angle - context.calculated_angle + 0.3) * context.calculated_radius * 1.2
            },
            // bottom right internal point
            {
                x: context.x - Math.sin(Math.PI + context.angle + context.calculated_angle - 0.3) * (context.calculated_radius * 1.2),
                y: context.y - Math.cos(Math.PI + context.angle + context.calculated_angle - 0.3) * (context.calculated_radius * 1.2)
            },
            // bottom right point
            {
                x: context.x - Math.sin(Math.PI + context.angle + context.calculated_angle) * context.calculated_radius,
                y: context.y - Math.cos(Math.PI + context.angle + context.calculated_angle) * context.calculated_radius
            }
        ]
    }
};
import {Factory} from './factory.js';

// lerp works for linear interpolation
export const lerp = (a, b, t) => a + (b - a) * t;

// clamp a number between a and b
export const clamp = (x, a, b) => Math.min(Math.max(x, a), b);

// create the working canvas
export const getCanvas = (width) => {
    const canvas = document.getElementById('canvas');
    const factory = new Factory();
    canvas.width = width;
    return {
        canvas,
        ctx: canvas.getContext('2d'),
        factory
    }
};

// detect the intersection of two lines
export const getIntersection = (A, B, C, D) => {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop/bottom;
        const u = uTop/bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }

    return null;
};

// just to clear main
export const processCtx = (canvas, ctx, car) => {

};

// draw collection of entities
export const drawEntities = (ctx, entities, requestCallback) => {
    for (let i = 0; i < entities.length; i++) {
        entities[i].draw(ctx);
    }
    // restore context & requestAnimationFrame
    ctx.restore();
    requestAnimationFrame(requestCallback);
};

// calculate car's turning angle's rate change
export const getTurnRatio = (model, crd = 0.35) => {
    return model.maxSpeed * crd / model.friction / model.acceleration;
}

// detect polygons intersection
export const polysIntersect = (poly1, poly2) => {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length],
            )
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

// game colors
export const colors = [
    '#ffffff',  // 0 - white
    '#000000',  // 1 - black
    '#009FF6FF',// 2 - player
    '#ff0000',  // 3 - crash
    '#fc0356',  // 4 - rays intersected
    '#ffbd4a',  // 5 - rays
    '#c54c61',  // 6
    '#007700',  // 7
    '#00117a',  // 8
    '#6da60c',  // 9
    '#8700b4',  // 10
]

// random number between a and b
export const random = (min, max) => {
    return Math.random() * (max - min) + min;
}
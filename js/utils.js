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
}

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
}

// just to clear main
export const processCtx = (canvas, ctx, car) => {
    canvas.height = window.innerHeight;
    const yTranslation = -car.y + canvas.height * 0.7;
    ctx.save();
    ctx.translate(0, yTranslation);
}

// draw collection of entities
export const drawEntities = (ctx, entities, requestCallback) => {
    entities.forEach(entity => {
        entity.draw(ctx);
    })
    // restore context & requestAnimationFrame
    ctx.restore();
    requestAnimationFrame(requestCallback);
}

export const getTurnRatio = (model, crd = 0.25) => {
    const a = 1 / model.friction;
    const b = model.acceleration / crd;
    const c = (a / b) * model.maxSpeed;
    return c;
}
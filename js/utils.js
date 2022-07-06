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
import {lerp, clamp} from './utils.js';

export class Road {
    constructor({id = 0, x, width, laneCount = 3}) {
        this.name = 'Road #' + id + ' with ' + laneCount + ' lanes';
        // init
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        // add reference the edges of the road
        this.left = x - width / 2;
        this.right = x + width / 2;
        // add reference to draw the lines
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
        // create game borders
        this.borders = this.#getBordersEdges();
    }

    #getBordersEdges() {
        // define all the borders (edges combinations) first
        const [ topLeft, bottomLeft, topRight, bottomRight ] = [
            { x: this.left, y: this.top },
            { x: this.left, y: this.bottom },
            { x: this.right, y: this.top },
            { x: this.right, y: this.bottom }
        ];
        // then fetch the data
        return [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneWidth() {
        return this.width / this.laneCount;
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.getLaneWidth();
        const clamRange = clamp(laneIndex, 0, this.laneCount - 1);
        return (this.left + laneWidth * 0.5) + clamRange * laneWidth;
    }


    draw(gameCtx) {
        // configure the stroke and line props
        gameCtx.lineWidth = 5;
        gameCtx.strokeStyle = '#FFFFFF';
        // draw the road lines
        for (let i = 1; i <= this.laneCount-1; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            gameCtx.setLineDash([20, 20]);
            gameCtx.beginPath();
            gameCtx.moveTo(x, this.top);
            gameCtx.lineTo(x, this.bottom);
            gameCtx.stroke();
        }
        // draw the borders
        gameCtx.setLineDash([]);
        for (let i = 0; i < this.borders.length; i++) {
            const [top, bottom] = this.borders[i];
            gameCtx.beginPath();
            gameCtx.moveTo(top.x, top.y);
            gameCtx.lineTo(bottom.x, bottom.y);
            gameCtx.stroke();
        }
    }
}

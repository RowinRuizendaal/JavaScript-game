import { boundaries } from "./store.js";
import { collisions } from "./collisions.js";
import { Boundary } from "./classes.js";
import { offset } from "./constants.js";

export const generateBoundaries = () => {
    const collisionsMap = [];
    for (let i = 0; i < collisions.length; i += 70) {
        collisionsMap.push(collisions.slice(i, 70 + i));
    }

    let boundariesMap = [];

    boundaries.subscribe((value) => {
        boundariesMap = value;
    });

    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 1025)
                boundariesMap.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + offset.x,
                            y: i * Boundary.height + offset.y,
                        },
                    })
                );
        });
    });

    boundaries.update(() => {
        return boundariesMap;
    });
};
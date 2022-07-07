// @ts-nocheck
import {
    image,
    playerDownImage,
    playerUpImage,
    playerLeftImage,
    playerRightImage,
    foregroundImage,
} from "./images.js";
import {
    canvasContext,
    canvasStore,
    keys,
    lastKey,
    boundaries,
} from "./store.js";
import { Boundary, Sprite } from "./classes.js";
import { offset, canvas as canvasSizes } from "./constants.js";
import { rectangularCollision } from "./rectangularCollision.js";

let ctx;
let canvas;
let keysObject;
let lastKeyPressed;
let boundariesMap;

canvasContext.subscribe((value) => {
    ctx = value;
});

canvasStore.subscribe((value) => {
    canvas = value;
});

keys.subscribe((value) => {
    keysObject = value;
});

lastKey.subscribe((value) => {
    lastKeyPressed = value;
});

boundaries.subscribe((value) => {
    boundariesMap = value;
});

// need to refactor this
const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: image,
});

const player = new Sprite({
    position: {
        x: canvasSizes.width / 2 - 192 / 4 / 2,
        y: canvasSizes.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    },
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage,
});

export const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();

    const movables = [background, ...boundariesMap, foreground];

    boundariesMap.forEach((boundary) => {
        boundary.draw();
    });

    player.draw();
    foreground.draw();

    let moving = true;
    player.moving = false;
    if (keysObject.w.pressed && lastKeyPressed === "w") {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundariesMap.length; i++) {
            const boundary = boundariesMap[i];
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3;
            });
    } else if (keysObject.a.pressed && lastKeyPressed === "a") {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundariesMap.length; i++) {
            const boundary = boundariesMap[i];
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3;
            });
    } else if (keysObject.s.pressed && lastKeyPressed === "s") {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundariesMap.length; i++) {
            const boundary = boundariesMap[i];
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3;
            });
    } else if (keysObject.d.pressed && lastKeyPressed === "d") {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundariesMap.length; i++) {
            const boundary = boundariesMap[i];
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3;
            });
    }
};
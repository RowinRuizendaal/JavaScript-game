import { keys, lastKey } from "./store.js";

let keysObject;
let lastKeyPressed;

keys.subscribe((value) => {
    keysObject = value;
});

lastKey.subscribe((value) => {
    lastKeyPressed = value;
});

export const handleMovementKeyDown = (code) => {
    switch (code) {
        case "w":
        case "ArrowUp":
            keys.update((value) => {
                value.w.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "w";
                return value;
            });
            break;
        case "a":
        case "ArrowLeft":
            keys.update((value) => {
                value.a.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "a";
                return value;
            });
            break;
        case "s":
        case "ArrowDown":
            keys.update((value) => {
                value.s.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "s";
                return value;
            });
            break;
        case "d":
        case "ArrowRight":
            keys.update((value) => {
                value.d.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "d";
                return value;
            });
            break;
    }
};

export const handleMovementKeyUp = (code) => {
    switch (code) {
        case "w":
        case "ArrowUp":
            keys.update((value) => {
                value.w.pressed = false;
                return value;
            });
            break;
        case "a":
        case "ArrowLeft":
            keys.update((value) => {
                value.a.pressed = false;
                return value;
            });
            break;
        case "s":
        case "ArrowDown":
            keys.update((value) => {
                value.s.pressed = false;
                return value;
            });
            break;
        case "d":
        case "ArrowRight":
            keys.update((value) => {
                value.d.pressed = false;
                return value;
            });
            break;
    }
};

// mobile movements
export const handleMobileMovementTouchStart = (code) => {
    switch (code) {
        case "up":
            keys.update((value) => {
                value.w.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "w";
                return value;
            });
            break;
        case "down":
            keys.update((value) => {
                value.s.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "s";
                return value;
            });
            break;
        case "left":
            keys.update((value) => {
                value.a.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "a";
                return value;
            });
            break;
        case "right":
            keys.update((value) => {
                value.d.pressed = true;
                return value;
            });

            lastKey.update((value) => {
                value = "d";
                return value;
            });
            break;
    }
};

export const handleMobileMovementTouchEnd = (code) => {
    switch (code) {
        case "up":
            keys.update((value) => {
                value.w.pressed = false;
                return value;
            });
            break;
        case "down":
            keys.update((value) => {
                value.s.pressed = false;
                return value;
            });
            break;
        case "left":
            keys.update((value) => {
                value.a.pressed = false;
                return value;
            });
            break;
        case "right":
            keys.update((value) => {
                value.d.pressed = false;
                return value;
            });
            break;
    }
};
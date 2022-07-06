// Index.js file for the application

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const upButton = document.querySelector(".gamepad-button-up");
const downButton = document.querySelector(".gamepad-button-down");
const leftButton = document.querySelector(".gamepad-button-left");
const rightButton = document.querySelector(".gamepad-button-right");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionsMap = [];

// 70 is width of the map
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: isMobile() ? -1130 : -300,
    y: -450,
};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
    });
});

const image = new Image();
image.src =
    "https://rowinruizendaal.github.io/portfolio-game/Images/Pellet-Town.png";

const foregroundImage = new Image();
foregroundImage.src =
    "https://rowinruizendaal.github.io/portfolio-game/Images/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src =
    "https://rowinruizendaal.github.io/portfolio-game/Images/playerDown.png";


const playerUpImage = new Image();
playerUpImage.src =
    "https://rowinruizendaal.github.io/portfolio-game/Images/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src =
    "https://rowinruizendaal.github.io/portfolio-game/Images/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src =
    "https://rowinruizendaal.github.io/portfolio-game/Images/playerRight.png";

const player = new Sprite({
    position: {
        x: isMobile() ?
            canvas.width / 2 - 900 / 4 / 2 :
            canvas.width / 2 - 192 / 4 / 2,
        y: isMobile() ?
            canvas.height / 2 - 10 / 4 / 2 :
            canvas.height / 2 - 68 / 4 / 2,
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

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image,
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage,
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

const moveables = [background, ...boundaries, foreground];

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();

        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: boundary,
            })
        ) {}
    });

    player.draw();
    foreground.draw();

    let moving = true;
    player.moving = false;

    if (keys.w.pressed && lastKey === "w") {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
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
            moveables.forEach((moveable) => {
                moveable.position.y += 3;
            });
    } else if (keys.a.pressed && lastKey === "a") {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
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
            moveables.forEach((moveable) => {
                moveable.position.x += 3;
            });
    } else if (keys.s.pressed && lastKey === "s") {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
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
            moveables.forEach((moveable) => {
                moveable.position.y -= 3;
            });
    } else if (keys.d.pressed && lastKey === "d") {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
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
            moveables.forEach((moveable) => {
                moveable.position.x -= 3;
            });
    }
}

animate();

let lastKey = "";

window.addEventListener("keydown", (e) => {
    console.log(e.key);
    switch (e.key) {
        case "w":
        case "ArrowUp":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "a":
        case "ArrowLeft":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "s":
        case "ArrowDown":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "d":
        case "ArrowRight":
            keys.d.pressed = true;
            lastKey = "d";
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
        case "ArrowUp":
            keys.w.pressed = false;
            break;
        case "a":
        case "ArrowLeft":
            keys.a.pressed = false;
            break;
        case "s":
        case "ArrowDown":
            keys.s.pressed = false;
            break;
        case "d":
        case "ArrowRight":
            keys.d.pressed = false;
            break;
    }
});

// Mobile controls
upButton.addEventListener("touchstart", () => {
    keys.w.pressed = true;
    lastKey = "w";
});

upButton.addEventListener("touchend", () => {
    keys.w.pressed = false;
});

downButton.addEventListener("touchstart", () => {
    keys.s.pressed = true;
    lastKey = "s";
});

downButton.addEventListener("touchend", () => {
    keys.s.pressed = false;
});

leftButton.addEventListener("touchstart", () => {
    keys.a.pressed = true;
    lastKey = "a";
});

leftButton.addEventListener("touchend", () => {
    keys.a.pressed = false;
});

rightButton.addEventListener("touchstart", () => {
    keys.d.pressed = true;
    lastKey = "d";
});

rightButton.addEventListener("touchend", () => {
    keys.d.pressed = false;
});

// bypass for now
let clicked = false;
addEventListener("click", () => {
    if (!clicked) {
        audio.Map.play();
        clicked = true;
    }
});
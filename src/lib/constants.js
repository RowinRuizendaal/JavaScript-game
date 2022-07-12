import { isMobile } from "./utils";

export const offset = {
    x: isMobile() ? -700 : -300,
    y: -450,
};

export let canvas = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export let tiledMapWidth = 70;
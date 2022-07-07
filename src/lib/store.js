import { writable } from "svelte/store";

export const canvasContext = writable(0);
export const canvasStore = writable(0);
export const keys = writable({
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
});
export const lastKey = writable("");
export const boundaries = writable([]);
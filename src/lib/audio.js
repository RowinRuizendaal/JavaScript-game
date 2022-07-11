import { Howl } from "howler";

export const audio = {
    Map: new Howl({
        src: "audio/map.wav",
        html5: true,
        loop: true,
        volume: 0.5,
    }),
    dialogueNext: new Howl({
        src: "audio/dialogueNext.wav",
        html5: true,
        volume: 0.5,
    }),
};
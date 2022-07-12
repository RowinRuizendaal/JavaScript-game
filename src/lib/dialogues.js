import { isMobile } from "./utils";
import { _ } from "svelte-i18n";

export const intro = {
    dialouge: [{
            text: "dialouge.intro.p1",
        },
        {
            text: "dialouge.intro.p2",
        },
        {
            text: "dialouge.intro.p3",
        },
        {
            text: "dialouge.intro.p4",
        },
        {
            text: "dialouge.intro.p5",
        },
        {
            text: isMobile() ? "dialouge.intro.p6" : "dialouge.intro.p7",
        },
    ],
};

export const controls = {
    dialouge: [{
        click: "dialouge.controls.p1",
    }, ],
};
<script>
  import { onMount } from "svelte";
  import {
    handleMovementKeyDown,
    handleMovementKeyUp,
  } from "./lib/movement.js";
  import { animate } from "./lib/animate.js";
  import { canvasContext, canvasStore } from "./lib/store.js";
  import { canvas as canvasSizes } from "./lib/constants.js";
  import { generateBoundaries } from "./lib/boundaries.js";
  import MobileGamepad from "./components/mobileGamepad.svelte";
  import Dialogue from "./components/dialogue.svelte";
  import { intro } from "./lib/dialogues.js";
  import { audio } from "./lib/audio.js";

  export let canvas;
  export let ctx;

  let clicked = false;

  const playAudio = () => {
    if (!clicked) {
      audio.Map.play();
      clicked = true;
    }
  };

  onMount(() => {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvasContext.update(() => {
      return ctx;
    });

    canvasStore.update(() => {
      return canvas;
    });

    window.addEventListener("keydown", (e) => {
      handleMovementKeyDown(e.key);
    });

    window.addEventListener("keyup", (e) => {
      playAudio();
      handleMovementKeyUp(e.key);
    });

    window.addEventListener("click", (e) => {
      playAudio();
    });

    animate();
    generateBoundaries();
  });
</script>

<main>
  <body>
    <canvas
      bind:this={canvas}
      width={canvasSizes.width}
      height={canvasSizes.height}
    />
    <Dialogue visible={true} text={intro} />

    <MobileGamepad />
  </body>
</main>

<style>
  canvas {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    position: relative;
  }
</style>

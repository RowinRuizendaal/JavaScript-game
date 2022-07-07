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

  export let canvas;
  export let ctx;

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
      handleMovementKeyUp(e.key);
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

    <MobileGamepad />
  </body>
</main>

<style>
  canvas {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
</style>

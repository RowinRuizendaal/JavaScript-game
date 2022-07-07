<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { handleMobileMovementTouchStart, handleMobileMovementTouchEnd } from "../lib/movement.js";

  onMount(() => {
    const mobileGamePadActions = document.querySelectorAll("#control");

    mobileGamePadActions.forEach((action) => {
      action.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleMobileMovementTouchStart(e.target.id);
      });
    });

    mobileGamePadActions.forEach((action) => {
      action.addEventListener("touchend", (e) => {
        e.preventDefault();
        handleMobileMovementTouchEnd(e.target.id);
      });
    });


    mobileGamePadActions.forEach((action) => {
      action.addEventListener("click", (e) => {
        handleMobileMovementTouchStart(e.target.id);
      });
    });


  });
</script>

<!-- mobile gamepad -->
<div class="mobile-gamepad">
  <div class="controls">
    <div class="gamepad-button-up" id="control">
      <span id="up">&#8593;</span>
    </div>
    <div class="gamepad-button-down" id="control">
      <span id="down">&#8595;</span>
    </div>
    <div class="gamepad-button-left" id="control">
      <span id="left">&#8592;</span>
    </div>
    <div class="gamepad-button-right" id="control">
      <span id="right">&#8594;</span>
    </div>
  </div>
</div>

<style>
  .mobile-gamepad {
    display: none;
  }

  /* Mobile */

  @media only screen and (max-width: 768px) {
    .mobile-gamepad {
      position: absolute;
      display: block;
      bottom: 1rem;
      right: 0;
      padding: 3rem 0.2rem;
    }
    .controls {
      position: relative;
      width: 10rem;
      font-size: 2rem;
    }
    .gamepad-button-up {
      position: absolute;
      bottom: 0;
      text-align: center;
      left: 0;
      right: 0;
      margin-bottom: 1rem;
    }
    .gamepad-button-down {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      z-index: 9;
      margin-top: 0.5rem;
    }
    .gamepad-button-left {
      position: absolute;
      left: 0;
      right: 0;
      border: 0;
    }
    .gamepad-button-right {
      position: absolute;
      right: 0;
    }
    span {
      background-color: #333232;
      color: white;
      padding: 1rem;
      border-radius: 10px;
      margin-top: 10px;
    }
  }
</style>

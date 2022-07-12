<script>
  import { onMount } from "svelte";
  import { dialogueActive } from "../lib/store";
  import { audio } from "../lib/audio.js";
  import { _ as t } from "svelte-i18n";
  import { get } from "svelte/store";


  export let text = {};
  export let visible = false;
  let activeRow = 0;
  let dialougeText = "";

  const handleDialogueText = () => {
    const length = text.dialouge.length;

    audio.dialogueNext.play();

    if (activeRow < length) {
      dialougeText = get(t)(`${text.dialouge[activeRow].text}`);

      activeRow++;
    } else {
      activeRow = 0;
      dialougeText = "";

      dialogueActive.update(() => {
        toggleModal();
        return false;
      });
    }
  };

  const toggleModal = () => {
    visible = !visible;
  };

  onMount(() => {
    handleDialogueText();
  });
</script>

{#if visible}
  <div class="box" on:click={handleDialogueText}>
    <div class="relative">
      <p class="dialouge--text">{@html dialougeText}</p>
      <i on:click={handleDialogueText} />
      <p class="click--guide">
        <span>{$t('dialouge.controls.continue')}</span>
      </p>
    </div>
  </div>
{/if}

<style scoped>
  .box {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 2px;
    padding: 8px;
    line-height: 16px;
    margin: auto;
    background: white;
    border: 1px solid white;
    box-shadow: 0 1px 0 1px black, inset 0 1px 0 1px black, 0 0 0 1px black,
      inset 0 0 0 1px black;
    z-index: 999;
  }

  .box .dialouge--text {
    font-size: 1.5rem;
    padding: 1rem;
  }

  .relative {
    position: relative;
  }
  .box .relative i {
    border: 5px solid transparent;
    border-top-color: black;
    /* animation: bounce 3s ease-in-out infinite alternate; */
    position: absolute;
    right: 0;
    bottom: 0;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .click--guide {
    text-align: center;
    font-size: 0.9rem;
    cursor: pointer;
    animation: bounce 3s ease-in-out infinite alternate;
  }

  .box p {
    line-height: 1.8rem;
  }
</style>

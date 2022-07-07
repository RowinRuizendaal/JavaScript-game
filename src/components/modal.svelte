<script>
  let visible = localStorage.getItem("visible") || false;

  const toggleModal = () => {
    visible = !visible;

    // enable this is finished
    // localStorage.setItem("visible", 'false');
  };

</script>

{#if !visible}
  <div class="modal">
    <h1>Welcome visitor</h1>
    <button on:click={toggleModal}>Close modal</button>
  </div>
{/if}

<style>
    .modal {
        display: none;
    }
  @media only screen and (max-width: 768px) {
    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #f1f1f1;
      opacity: 0.5;
      height: 100%;
      width: 100%;
      z-index: 999;
    }
    .modal h1 {
      text-align: center;
      margin-top: 1rem;
    }
  }
</style>

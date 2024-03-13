<script>
  export let text = '';
  export let onClose = () => {};
  export let active = false;
</script>

<div class="modal {active ? 'active' : ''}" on:click="{onClose}">
  <div class="modal-content" on:click|stopPropagation>
    <span class="close" on:click={onClose}>×</span>
    <p class="modal-text">{text}</p>
  </div>
</div>

<style>
  /* Modal styles */
  .modal {
    /* Styles to center the modal */
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 5px;
    position: relative;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-text {
    text-align: center; /* Center text */
  }
</style>

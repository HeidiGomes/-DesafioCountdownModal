<!-- src/routes/+page.svelte -->
<script>
  import { writable, get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import Modal from './Modal.svelte';
  import Candidate from './candidatos/Candidate.svelte';

  let formData = writable({ name: '', phone: '', email: '' });
  let timer = writable(15);
  let interval;
  let showModal = false;
  let modalText = '';
  let timeIsUp = false;
  let showCandidateSection = false;

  function startChallenge() {
    interval = setInterval(() => {
      timer.update(n => {
        if (n <= 0) {
          clearInterval(interval);
          timeIsUp = true;
          showModal = true;
          modalText = "Challenge ended with failure!";
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  }

  function stopChallenge() {
    clearInterval(interval);
  }

  function openModal() {
    stopChallenge();
    modalText = get(timer) <= 0 ? "Challenge ended with failure!" : "Challenge ended successfully!";
    showModal = true;

    // Save form data in session storage
    sessionStorage.setItem('formData', JSON.stringify(get(formData)));
  }

  function goToCandidatePage() {
    const formDataValue = get(formData);
    goto('/candidatos', { state: { formData: formDataValue } });
  }

  function goToHomePage() {
    goto('/');
  }

  function closeModal() {
    showModal = false;
    timeIsUp = false;
  }

  function closeModalOutside(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<style>
  /* Styles for the +page component */
  @import './styles.css';

  .form-container {
    /* Center the form on the screen */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .navigation-button {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>

<div class="form-container">
  <h1>Challenge</h1>
  <form>
    <label>
      Name:
      <input type="text" bind:value={$formData.name} />
    </label>
    <label>
      Phone:
      <input type="tel" bind:value={$formData.phone} />
    </label>
    <label>
      Email:
      <input type="email" bind:value={$formData.email} />
    </label>
    <button on:click={startChallenge}>Start Challenge</button>
    {#if $timer > 0}
      <div>
        Remaining time: {('0' + Math.floor($timer / 60)).slice(-2)}:{('0' + ($timer % 60)).slice(-2)}
      </div>
    {/if}
    <button on:click={openModal}>Submit</button>
  </form>
</div>

{#if showModal || timeIsUp}
  <div class="modal-overlay" on:click={closeModalOutside}>
    <Modal text={modalText} onClose={closeModal} />
  </div>
{/if}

<!-- Button to navigate to the "candidates" page -->
<button class="navigation-button" on:click={goToCandidatePage}>Candidate</button>
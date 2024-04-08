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
  let showCandidateButton = false;
  let showTimer = false; // Moves the showTimer variable declaration out of the scope of the script block
  
  // Function to start the challenge
  function startChallenge() {
    // If there is a stored timer, set the timer to the stored value
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('timer') !== null) {
      timer.set(JSON.parse(sessionStorage.getItem('timer')));
    } else {
      // Otherwise, start a new timer
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

    // Shows the timer when the challenge starts
    showTimer = true;

    // Display the "Candidate" button
    showCandidateButton = true;
  }

  function stopChallenge() {
    clearInterval(interval);
  }

  function openModal() {
    stopChallenge();
    modalText = get(timer) <= 0 ? "Challenge ended with failure!" : "Challenge ended successfully!";
    showModal = true;
    sessionStorage.setItem('formData', JSON.stringify(get(formData)));
    sessionStorage.setItem('timer', JSON.stringify(get(timer)));
  }

  function goToCandidatePage() {
    const formDataValue = get(formData);
    sessionStorage.setItem('formData', JSON.stringify(formDataValue));
    goto('/candidatos', { state: { formData: formDataValue } });
  }

  function goToHomePage() {
    // Remove the sessionStorage timer when leaving the page
    sessionStorage.removeItem('timer');
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

  
// Check if there is a timer stored in sessionStorage when loading the page
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('timer') !== null) {
    timer.set(JSON.parse(sessionStorage.getItem('timer')));
    showTimer = true;
  }
</script>

<style>
  /* Styles for the +page component */
  @import './styles.css';

  body{
    margin: 0;
    padding: 0;
    overflow: hidden; /* Oculta as barras de rolagem */
    background: linear-gradient(45deg, #8e3de2, #4a00e0);
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
}

#font{
  font-width: normal;
}

.form-container {
  background: #ffff;
  width: 80%;
  max-width: 350px;
  min-width: 350px;
  min-height: 40vh;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

}
  .form-container button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background: linear-gradient(to left, #4776e6, #8e54e9);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

}

/* Styles for input fields */
.form-container input {
  position: relative;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;
}

/* Bottom margin for first input field */
.form-container input:first-child {
  margin-bottom: 1rem;
}

/* Underline effect when focusing */
.form-container input:focus {
  border-color: rgba(0, 0, 0, 0.7);
}

/* Styles for placeholder text */
.form-container input::placeholder {
  color: rgba(0, 0, 0, 0.7);
}

.navigation-button {
  width: 100px;
  border-color: rgba(0, 0, 0, 0);
  
}
.icon {
    width: 24px;
    height: 24px;
  }

.input-container {
    position: relative; /* Sets relative positioning so we can position the icon */

    width: 100%; /* Ensures that the input field occupies the entire width */

  }

  .input-container input {
    padding-left: 40px; /* Leave enough space for the icon */
  }

  .input-container .icon {
    position: absolute; /* Sets absolute positioning so that the icon can be positioned within the input field */
    left: 10px; /* Positions the icon 10px to the left of the input field */
    top: 50%; /* Vertically centers the icon */
    transform: translateY(-80%); /* Fix the vertical position of the icon */
  }


</style>

<body>
  <div class="form-container">
    <h1>Challenge</h1>
    <form>
      <div class="input-container">
        <input type="text" bind:value={$formData.name} placeholder="Enter your name" />
        <img src="/name.png" alt="Icon" class="icon" />
      </div>

      <div class="input-container">
        <input type="tel" bind:value={$formData.phone} placeholder="Enter your phone" />
        <img src="/phone.png" alt="Icon" class="icon" />
      </div>

      <div class="input-container">
        <input type="email" bind:value={$formData.email} placeholder="Enter your Email" />
        <img src="/email.png" alt="Icon" class="icon" />
      </div>

      <button on:click={startChallenge}>Start Challenge</button>
      <button on:click={openModal}>Submit</button>

      {#if showTimer && $timer > 0}
        <div>
          Remaining time: {('0' + Math.floor($timer / 60)).slice(-2)}:{('0' + ($timer % 60)).slice(-2)}
        </div>
      {/if}
    </form>
  </div>

  {#if showModal && timeIsUp}
    <div class="modal-overlay" on:click={closeModalOutside}>
      <Modal text={modalText} onClose={closeModal} />
    </div>
  {/if}

  {#if showCandidateButton}
    <button class="navigation-button" on:click={goToCandidatePage}>Candidate</button>
  {/if}
</body>
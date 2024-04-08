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
  let showTimer = false; // Variável para controlar a visibilidade do timer
  let showCandidateButton = false; // Variável para controlar a visibilidade do botão "Candidate"

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

    // Mostra o timer quando o desafio é iniciado
    showTimer = true;

    // Exibe o botão "Candidate"
    showCandidateButton = true;
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

/* Estilos para os campos de entrada */
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

/* Margem inferior para o primeiro campo de entrada */
.form-container input:first-child {
  margin-bottom: 1rem;
}

/* Efeito de linha de sublinhado ao focar */
.form-container input:focus {
  border-color: rgba(0, 0, 0, 0.7);
}

/* Estilos para o texto de espaço reservado (placeholder) */
.form-container input::placeholder {
  color: rgba(0, 0, 0, 0.7);
}

.navigation-button {
  width: 100px;
  border-color: rgba(0, 0, 0, 0);
  
}

.input-container {
  position: relative;
}

.input-container i {
  position: absolute;
  left: 8px;
  top: 40%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.input-container input {
  padding-left: 30px; /* Deixe espaço suficiente para o ícone */
}

</style>

<body>
  <div class="form-container">
  <h1>Challenge</h1>

  <form>

    <div class="input-container">
      <input type="text" bind:value={$formData.name} placeholder="Enter your name" />
      
    </div>

    <div class="input-container">
      <input type="tel" bind:value={$formData.phone} placeholder="Enter your phone" />
      
    </div>

    <div class="input-container">
      <input type="email" bind:value={$formData.email} placeholder="Enter your Email" />
      
    </div>

    <button on:click={startChallenge}>Start Challenge</button>
    <button on:click={openModal}>Submit</button>

      {#if showTimer && $timer > 0} <!-- Mostra o timer apenas quando showTimer for true -->
        <div>
          Remaining time: {('0' + Math.floor($timer / 60)).slice(-2)}:{('0' + ($timer % 60)).slice(-2)}
        </div>
      {/if}

    </form>
  </div>

  {#if showModal || timeIsUp}
    <div class="modal-overlay" on:click={closeModalOutside}>
      <Modal text={modalText} onClose={closeModal} />
    </div>
  {/if}

  <!-- Button to navigate to the "candidates" page -->
  {#if showCandidateButton}
    <button class="navigation-button" on:click={goToCandidatePage}>Candidate</button>
  {/if}
</body>

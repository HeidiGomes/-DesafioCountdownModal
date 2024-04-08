<!-- src/routes/candidatos/+page.svelte -->
<script>
  import Candidate from './Candidate.svelte';
  import { goto } from '$app/navigation'; // Import the goto function for navigation

  let formData = {};

  // Check if the code is running in the browser
  if (typeof window !== 'undefined') {
    // Retrieve the form data from session storage
    formData = JSON.parse(sessionStorage.getItem('formData')) || {};
  }

  // Function to navigate to the challenge home page
  function goToHomePage() {
    goto('/'); // Navigate to the initial route
  }
</script>

<main>
  <!-- Content section of the page -->
  <Candidate {formData} />

  <!-- Button to navigate to the challenge home page -->
  <button class="navigation-button" on:click={goToHomePage}>Start of Challenge</button>
</main>

<style>

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
  /* Navigation button styles */
  .navigation-button {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>



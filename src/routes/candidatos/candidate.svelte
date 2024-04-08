<!-- src/routes/candidatos/Candidate.svelte -->
<script>
  export let formData = {};
</script>

<body>
  <div class="candidate-container">
    <h2>Candidate</h2>
    <div>
      <p>Name: {formData.name}</p>
      <p>Phone: {formData.phone}</p>
      <p>Email: {formData.email}</p>
    </div>
  </div>
</body>

<style>
  /* Styles for the Candidate component */
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
  .candidate-container {
    background: #ffff;
    width: 50%;
    max-width: 200px;
    min-width: 180px;
    min-height: 20vh;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }

  .candidate-container h2 {
    margin-bottom: 10px;
  }

  .candidate-container div p {
    margin-bottom: 5px;
  }
</style>


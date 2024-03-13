<!-- src/routes/candidatos/Candidate.svelte -->
<script>
  export let formData = {};
</script>

<div class="candidate-container">
  <h2>Candidate</h2>
  <div>
    <p>Name: {formData.name}</p>
    <p>Phone: {formData.phone}</p>
    <p>Email: {formData.email}</p>
  </div>
</div>

<style>
  /* Styles for the Candidate component */
  .candidate-container {
    max-width: 400px;
    margin: 20% auto; /* Adjust the top and bottom margin to 20% of the screen height */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .candidate-container h2 {
    margin-bottom: 10px;
  }

  .candidate-container div p {
    margin-bottom: 5px;
  }
</style>


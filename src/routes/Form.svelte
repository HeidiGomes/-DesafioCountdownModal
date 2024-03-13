<!-- src/routes/Form.svelte -->
<script lang="ts">
  import { useState, onMount } from 'svelte';
  import Modal from './Modal.svelte';

  let name = '';
  let phone = '';
  let email = '';
  let showModal = false;

  const handleSubmit = () => {
    // Implement logic to start the countdown
    console.log('Form submitted:', { name, phone, email });
  };

  const closeModal = () => {
    showModal = false;
  };

  onMount(() => {
    setTimeout(() => {
      showModal = true;
    }, 15000); // 15 seconds
  });
</script>

<style>
  /* Form styles */
  .form-container {
    max-width: 400px;
    margin: 20% auto; /* Adjust the top and bottom margin to 20% of the screen height */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .form-container label {
    display: block;
    margin-bottom: 10px;
  }

  .form-container input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .form-container button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

<div class="form-container">
  <h2>Form</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name} required />
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" bind:value={phone} required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <button type="submit">Start Challenge</button>
  </form>
</div>

{#if showModal}
  <Modal text="Challenge ended with failure!" onClose={closeModal} />
{/if}

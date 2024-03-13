<!-- src/routes/Countdown.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';

  let timeLeft = 15;
  let timer;

  function startCountdown() {
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        // Emit a failure event to the parent component
      }
    }, 1000);
  }

  onMount(startCountdown);
</script>

<div>{timeLeft}</div>

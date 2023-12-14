<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  import pollsStore from "../../stores/pollsStore";
  import PollCard from "../../lib/pollCard.svelte";

  let visible = false;
  onMount(() => (visible = true));
</script>

{#if visible}
  <main class="flex justify-center my-10" in:fade={{ duration: 300 }}>
    <div class="grid grid-cols-2 gap-x-8 gap-y-8">
      {#each $pollsStore as poll (poll.id)}
        <div animate:flip={{ duration: 300 }}>
          <PollCard {poll} />
        </div>
      {/each}
    </div>
  </main>
{/if}

<script lang="ts">
  import { type Poll } from "../interfaces/poll";
  import pollsStore from "../stores/pollsStore";
  import { tweened } from "svelte/motion";

  export let poll: Poll;

  const percent1 = tweened(0);
  const percent2 = tweened(0);

  $: total_votes = poll.option1Votes + poll.option2Votes;

  $: {
    percent1.set(
      total_votes === 0
        ? 0
        : Math.floor((poll.option1Votes / total_votes) * 100)
    );

    percent2.set(
      total_votes === 0
        ? 0
        : Math.floor((poll.option2Votes / total_votes) * 100)
    );
  }

  const handleVote = (option: number) => {
    const id = poll.id;

    pollsStore.update((polls) => {
      const pollIndex = polls.findIndex((poll) => poll.id === id);
      if (pollIndex !== -1) {
        if (option === 1) {
          polls[pollIndex].option1Votes += 1;
        } else if (option === 2) {
          polls[pollIndex].option2Votes += 1;
        }
      }
      return polls;
    });
  };

  const handleVoteDelete = () => {
    const id = poll.id;
    pollsStore.update((polls) => polls.filter((poll) => poll.id !== id));
  };
</script>

<div class="col-span-1 md:col-span-1 shadow px-6 py-4 w-[500px] bg-white">
  <h2 class="font-bold text-gray-700 text-lg">{poll.poll}</h2>
  <p class="text-sm text-gray-500">
    Total votes: ({total_votes})
  </p>
  <div class="mt-6">
    <!-- svelte-ignore -->
    <button
      on:click={() => handleVote(1)}
      class="w-full bg-gray-100 my-2 px-6 py-3 border-l-4 border-red-500 text-left relative"
    >
      <span
        style="width: {$percent1}%;"
        class="h-full absolute left-0 top-0 z-10 bg-red-200"
      ></span>
      <p class="relative z-20">{poll.option1} ({poll.option1Votes})</p>
    </button>
    <button
      on:click={() => handleVote(2)}
      class="w-full bg-gray-100 my-2 px-6 py-3 border-l-4 border-yellow-500 text-left relative"
    >
      <span
        style="width: {$percent2}%; "
        class=" h-full absolute left-0 top-0 z-10 bg-yellow-200"
      ></span>
      <p class="relative z-20">{poll.option2} ({poll.option2Votes})</p>
    </button>
  </div>
  <button
    on:click={() => handleVoteDelete()}
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
  >
    Delete Poll
  </button>
</div>

<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import * as zod from "zod";

  import pollsStore from "../../stores/pollsStore";

  import { navigate } from "svelte-routing";

  const schema = zod.object({
    poll: zod.string().min(5, "Poll must contain at least 5 character(s)"),
    option1: zod.string().min(1, "Option Cannot be empty"),
    option2: zod.string().min(1, "Option Cannot be empty"),
  });

  const { form, errors, isValid } = createForm({
    extend: validator({ schema }),
    onSubmit: async (values) => {
      pollsStore.update((polls) => [
        ...polls,
        { id: polls.length + 1, ...values, option1Votes: 0, option2Votes: 0 },
      ]);
      navigate("/");
    },
  });

  let visible = false;
  onMount(() => (visible = true));
</script>

{#if visible}
  <main class="flex flex-col items-center my-10" in:fade={{ duration: 300 }}>
    <form use:form class="my-12 flex flex-col gap-6">
      <span>
        <label for="poll" class="label"> Poll Question* </label>
        <input
          type="text"
          name="poll"
          class="input"
          placeholder="Enter your poll"
        />
        <p class="error">{$errors.poll ?? ""}</p>
      </span>
      <span>
        <label for="option1" class="label"> First Option* </label>
        <input
          type="text"
          name="option1"
          class="input"
          placeholder="Enter your first option"
        />
        <p class="error">{$errors.option1 ?? ""}</p>
      </span>
      <span>
        <label for="option2" class="label"> Second Option* </label>
        <input
          type="text"
          name="option2"
          class="input"
          placeholder="Enter your second option"
        />
        <p class="error">{$errors.option2 ?? ""}</p>
      </span>
      <span class="flex justify-center mt-10">
        <button
          disabled={!$isValid}
          type="submit"
          class="bg-amber-400 hover:bg-amber-500 disabled:bg-amber-800 text-white px-6 py-2 rounded-md font-bold"
          >Add
        </button>
      </span>
    </form>
  </main>
{/if}

<style>
  .label {
    @apply text-gray-700 block my-2 text-sm;
  }
  .input {
    @apply py-2 px-4 border border-gray-300 rounded w-[400px];
    @apply focus:outline-black focus:outline-1;
  }
  .error {
    @apply text-red-600 mt-1;
  }
</style>

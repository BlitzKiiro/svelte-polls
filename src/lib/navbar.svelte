<script>
  import { Link } from "svelte-routing";
</script>

<nav class=" flex justify-center gap-10 my-10">
  <Link to="/" let:active>
    <p class:active class="nav-link">Polls</p>
  </Link>
  <Link to="/add-poll" let:active>
    <p class:active class="nav-link">Add Poll</p>
  </Link>
</nav>

<style>
  .nav-link {
    @apply text-xl after:content-[''] after:block after:absolute after:-bottom-2 after:w-full after:h-[2px] after:bg-yellow-500 after:scale-0 after:transition-all duration-300;
  }
  .active {
    @apply text-yellow-500 relative transition-colors;
    @apply after:scale-100;
  }
</style>

<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/home/index.svelte";
  import AddPoll from "./routes/addPoll/index.svelte";
  import Header from "./lib/header.svelte";
  import Footer from "./lib/footer.svelte";
  import Navbar from "./lib/navbar.svelte";
</script>

<Router>
  <Header />
  <Navbar />
  <div class="main">
    <Route path="/" component={Home}></Route>
    <Route path="/add-poll" component={AddPoll}></Route>
  </div>
  <Footer />
</Router>

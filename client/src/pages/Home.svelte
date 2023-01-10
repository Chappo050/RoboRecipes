<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import NavBar from "../lib/NavBar.svelte";
  import HomeCarousel from "../lib/HomeCarousel.svelte";
import Footer from "../lib/Footer.svelte";
  let recipes: Recipe[];

  onMount(async () => {
    axios
      .get("/api/recipe/getRandomList")
      .then((res) => (recipes = res.data))
      .catch((err) => console.log(err));
  });
</script>

<main class="">
  <NavBar />
  <h1 class="text-3xl font-bold mb-4">Welcome to the Robo Recipes</h1>
  <div class="hero ">
    <div class="hero-content flex-col">

      <p class=" mb-8">
        Here you will find a collection of delicious recipes that have been hand
        made by AI (chatGPT3).
      </p>
      <div class="w-1/2">
        {#if recipes}
          <HomeCarousel {recipes} />
        {:else}
          <p class="animate-pulse">Fetching examples...</p>
        {/if}
      </div>
    </div>
  </div>
  <Footer/>
</main>


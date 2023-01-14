<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import NavBar from "../lib/NavBar.svelte";
  import HomeGallary from "../lib/HomeImageGallary.svelte";
  import Footer from "../lib/Footer.svelte";
  let recipes: Recipe[];

  onMount(async () => {
    axios
      .get("/api/recipe/getRandomList")
      .then((res) => (recipes = res.data))
      .catch((err) => console.log(err));
  });
</script>

<main class="p-10">
  <NavBar />
  <div class="flex flex-col items-center text-center w-full">
    <div class=" pt-20">
      <h1 class="text-3xl font-bold">Welcome to the Robo Recipes</h1>
      <p class=" mb-8">
        Here you will find a collection of delicious recipes that have been hand
        made by AI (chatGPT3).
      </p>
    </div>
    <div class="">
      {#if recipes}
        <HomeGallary {recipes} />
      {:else}
        <p class="animate-pulse">Fetching examples...</p>
      {/if}
    </div>
  </div>
  <Footer />
</main>

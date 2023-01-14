<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import noImage from "../assets/no_image.png";
  import NavBar from "../lib/NavBar.svelte";
  import Footer from "../lib/Footer.svelte";
  export let recipe: Recipe;


const recipeID: String = window.location.pathname.split('/')[2]
  onMount(async () => {
    axios
      .get("/api/recipe/getRecipeByID", {
        params: { _id: recipeID },
      })
      .then((res) => (recipe = res.data))
      .catch((err) => console.log(err));
  });
</script>

<main class="pt-10">
  <NavBar />
  {#if recipe}
    <div class="flex flex-col m-10 md:border-4 border-accent bg-base-100 ">
      <h1 class="text-2xl md:text-4xl font-bold mb-4 capitalize">{recipe.name}</h1>
      {#if recipe.imageUrl !== "no_image.png"}
        <img
          class="w-[450px] rounded-lg shadow-lg h-[400px] mx-auto "
          src={recipe.imageUrl}
          alt={recipe.name}
        />
      {:else}
        <img
          class="w-[450px] rounded-lg shadow-lg h-[400px] mx-auto "
          src={noImage}
          alt={recipe.name}
        />
      {/if}

      <div class="mb-4 border-y-2 border-y-gray-400 my-2">
        <h2 class="text-xl font-bold mb-2 ">Ingredients:</h2>
        <ul>
          {#each recipe.ingredients.split("-") as ingredient}
            <li>{ingredient}</li>
          {/each}
        </ul>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-bold mb-2">Instructions:</h2>
        <ol>
          {#each recipe.instructions as instruction}
            <li>{instruction}</li>
          {/each}
        </ol>
      </div>
    </div>
  {:else}
    <progress class="progress w-52" />
  {/if}
  <Footer/>
</main>

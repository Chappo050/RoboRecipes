<script lang="ts">
  import axios from "axios";
  export let isSaved = false;
  export let recipe: Recipe;
  let isLoading = false;

  function saveRecipe() {
    isLoading = true;
    axios
      .post("/api/recipe/saveNewRecipe", { recipe: recipe })
      .then((response) => {
        console.log(response);
        isSaved = true;
        isLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function removeRecipe() {
    isLoading = true;
    axios
      .post("/api/recipe/saveNewRecipe", { recipe: recipe })
      .then((response) => {
        console.log(response);
        isLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<main>
  {#if !isSaved}
    <button
      class="btn w-20 m-5"
      on:click={saveRecipe}
    >
      Save
    </button>
  {:else}
    <p class="text-2xl">This recipe has been saved to the database for everyone to see!</p>
  {/if}
</main>

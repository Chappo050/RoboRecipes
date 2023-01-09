<script lang="ts">
  import GenerateButton from "../lib/GenerateButton.svelte";
  import NavBar from "../lib/NavBar.svelte";
  import NewRecipe from "../lib/NewRecipe.svelte";
  let isGenerating;
  let recipeData

</script>

<main>
  <NavBar />

  <span class="m-1 justify-center">
    {#if isGenerating}
      <NewRecipe recipe={recipeData} />
    {/if}
    <GenerateButton bind:isGenerating={isGenerating} bind:recipeData={recipeData}/>
  </span>
</main>

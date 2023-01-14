<script lang="ts">
  import GenerateButton from "../lib/GenerateButton.svelte";
  import NavBar from "../lib/NavBar.svelte";
  import NewRecipe from "../lib/NewRecipe.svelte";
  let hasFetched;
  let recipeData
  import Footer from "../lib/Footer.svelte";
</script>

<main>
  <NavBar />

  <span class="m-1 justify-center">
    {#if hasFetched}
      <NewRecipe recipe={recipeData} />
    {/if}
    <GenerateButton bind:hasFetched={hasFetched} bind:recipeData={recipeData}/>
  </span>
  <Footer/>
</main>

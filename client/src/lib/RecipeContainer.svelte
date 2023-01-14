<script lang="ts">
  import RecipeCard from "./RecipeCard.svelte";
  export let recipes: Recipe[];
  export let showSettings;

</script>
<main>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each recipes as recipe}
      <RecipeCard {recipe} recipeID={recipe._id} showSettings={showSettings} />
    {/each}
  </div>
</main>

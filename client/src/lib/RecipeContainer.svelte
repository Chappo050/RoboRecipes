<script lang="ts">
  import RecipeCard from "./RecipeCard.svelte";
  export let recipes: Recipe[];
  export let showSettings;

</script>
<main>
  <div class="grid grid-cols-2 gap-4">
    {#each recipes as recipe}
      <RecipeCard {recipe} recipeID={recipe._id} showSettings={showSettings} />
    {/each}
  </div>
</main>

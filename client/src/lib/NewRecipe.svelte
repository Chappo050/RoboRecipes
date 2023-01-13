<script lang="ts">
  import SaveRecipeButton from "../lib/SaveRecipeButton.svelte";
  import noImage from "../assets/no_image.png";
  export let recipe: Recipe = {
    name: "hello",
    imageUrl: noImage,
    ingredients:
      "1 cup butter, softened; 1 cup white sugar; 1 cup packed brown sugar; 2 eggs; 1 tsp vanilla extract; 2 1/4 cups all-purpose flour; 1 tsp baking soda; 1 tsp salt; 1 cup semisweet chocolate chips",
    instructions:
      "Preheat oven to 350°F (175°C). In a large bowl, cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. Combine the flour, baking soda, and salt; gradually add to the creamed mixture and mix well. Stir in the chocolate chips. Drop by rounded tablespoonfuls onto ungreased baking sheets. Bake for 8-10 minutes, or until golden. Allow cookies to cool on baking sheet for 5 minutes before removing to a wire rack to cool completely.",
  };
</script>

<main class="flex flex-col m-10 border-4 border-accent bg-base-100 ">
  <h1 class="text-4xl font-bold mb-4 capitalize">{recipe.name}</h1>
{#if recipe.tempImage !== "no_image.png"}
   <img
    class="w-[300px] rounded-lg shadow-lg h-[300px] mx-auto "
    src={"data:image/png;base64," + recipe.tempImage}
    alt={recipe.name}
  />
  {:else}
  <img
  class="w-[300px] rounded-lg shadow-lg h-[300px] mx-auto "
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
  <SaveRecipeButton recipe={recipe} />
  <div />
</main>

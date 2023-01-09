<script lang="ts">
  import axios from "axios";
  export let isGenerating = false;
  export let recipeData;

  let prompt = "Chocolate chip cookie recipe";
  let isLoading = false;
  let fetchImage = false;

  function generateRecipe() {
    isLoading = true;
    axios
      .get("/api/generator/newRandom", {
        params: {
          prompt: prompt,
          fetchImage: fetchImage,
        },
      })
      .then((response) => {
        recipeData = cleanData(
          response.data.text.choices[0].text,
          response.data.image,
          response.data.tempImage
        );
        isGenerating = true;
        isLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function cleanData(data, image, tempImage) {
    let cleanData = data.split("\n\n");
    const newRecipe: Recipe = {
      name: prompt,
      imageUrl: image,
      tempImage: tempImage,
      ingredients: cleanData[2],
      instructions: cleanData.slice(4),
    };
    return newRecipe;
  }
</script>

<main>
  <form class="form-control text-primary-content" on:submit|preventDefault={generateRecipe}>
      <label class="block label" for="password">
        <span class="label-text">
          Enter a recipe you would like to create!
        </span>
      </label>
      <label class="input-group input-group-vertical">
        <span class="label-text">Recipe</span>
        <input
          type="text"
          class="input input-bordered label-text text-center"
          placeholder="Chocolate chip cookie recipe"
          bind:value={prompt}
        />
      </label>


      {#if !isLoading}

          <button type="submit" class="btn w-full mt-5">
            Generate new recipe
          </button>

          <label class="label flex flex-col" for="checkbox">
            <div>
              <input class=" checkbox" type="checkbox" id="checkbox" bind:checked={fetchImage} />
              <span class=" label-text">Use DALL-E 2 to generate an image for this recipe</span>
            </div>
        
          </label>
 
      {/if}

      {#if isLoading}
        <progress class="progress w-full mt-5"></progress>
      {/if}
  </form>
</main>

<style>
  @keyframes rotate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5);
    }
  }

  .loading {
    animation: pulse 1s ease-in-out infinite;
  }
</style>

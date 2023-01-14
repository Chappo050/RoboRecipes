<script lang="ts">
  import axios from "axios";
  export let recipeData;
  export let hasFetched = false; //Used to show if this is the initial request or not
  let prompt = "Chocolate chip cookie recipe";
  let isLoading = false; //Used to show the loading bar
  let fetchImage = false; //Used as the param to determine if an image will be fetched or not
  let isBlocked = false; //Used to show a warning
  let isError = false; //Used if there has been an error or timeout
  function generateRecipe() {
    isLoading = true;
    axios
      .get("/api/generator/newRandom", {
        timeout: 60000,
        params: {
          prompt: prompt,
          fetchImage: fetchImage,
        },
      })
      .then((response) => {
        recipeData = cleanData(
          response.data.text?.choices[0].text,
          response.data?.image,
          response.data?.tempImage,
          response.data?.isProfane
        );
        if (!response.data?.isProfane) {
          hasFetched = true;
          isLoading = false;
          isError = false
        }
      })
      .catch((error) => {
        console.error(error);
        isError = true
        regenerate();
      });
  }

  function cleanData(data, image, tempImage, isProfane) {
    console.log(isProfane);

    if (isProfane) {
      isLoading = false;
      hasFetched = false;
      fetchImage = false;
      isBlocked = true;
      return null;
    } else {
      //crude implimentation of string cleaning
      let cleanData = data.split("\n\n");
      console.log(cleanData);
      let ingredients: string;
      let instructions:string;
      if (cleanData[1] === 'Ingredients:') {
        ingredients = cleanData[2]
      }
       else {
        ingredients = cleanData[3]
       }
       if (cleanData[3] === 'Intructions:') {
        instructions= cleanData.slice(3)
        if (instructions[0] === "Instructions:" ) {
          instructions= instructions.slice(1)
        }
      }
       else {
        instructions= cleanData.slice(4)
        if (instructions[0] === "Instructions:" ) {
          instructions= instructions.slice(1)
        }
       }
      const newRecipe: Recipe = {
        name: prompt,
        imageUrl: image,
        tempImage: tempImage,
        ingredients: ingredients,
        instructions: instructions,
      };
      return newRecipe;
    }
  }

  //refreshed the booleans to allow another generation
  function regenerate() {
    isLoading = false;
    hasFetched = false;
    fetchImage = false;
    isBlocked = false;
  }
</script>

<main>
  <form
    class="form-control text-primary-content"
    on:submit|preventDefault={generateRecipe}
  >
    {#if !hasFetched}
      <label class="block label" for="">
        <span class="label-text">
          Enter a recipe you would like to create!
        </span>
        {#if isBlocked}
          <span class="label-text text-warning animate-pulse">
            Your recipe has been rejected due to profanity. Please try again.
          </span>
        {/if}
        {#if isError}
        <span class="label-text text-warning animate-pulse">
          An error has occured while generating your recipe. Please try again
        </span>
        {/if}
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
    {/if}

    {#if hasFetched}
      <button class="btn btn-square text-center w-full" on:click={regenerate}
        >Generate Another Recipe</button
      >
    {/if}

    {#if !hasFetched && !isLoading}
      <button type="submit" class="btn w-full mt-5">
        Generate new recipe
      </button>

      <label class="label flex flex-col" for="checkbox">
        <div>
          <input
            class=" checkbox"
            type="checkbox"
            id="checkbox"
            bind:checked={fetchImage}
          />
          <span class=" label-text"
            >Use DALL-E 2 to generate an image for this recipe</span
          >
        </div>
      </label>
    {/if}

    {#if isLoading}
      <progress class="progress w-full mt-5" />
    {/if}
  </form>
</main>

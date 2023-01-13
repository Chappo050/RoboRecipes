<script lang="ts">
  import { Link } from "svelte-routing";
import noImage from "../assets/no_image.png";
  export let recipes: Recipe[];

//To Fix:seems to be a weird gap in the middle of the picture where the Link doesnt work
</script>

<main>
  <div class="carousel w-full">
 
    {#each recipes as recipe, i}
  
      <div id={"slide" + i} class="carousel-item relative w-full">
        <div class="flex flex-col m-auto">


        <p class="text-2xl font-bold mb-4">{recipe.name.toUpperCase()}</p>
        <Link to={"/recipe/" + recipe._id}>
        
        {#if recipe.imageUrl !== "no_image.png"}
        
          <img
            class="w-[450px] rounded-lg shadow-lg h-[400px] mx-auto "
            src={"data:image/png;base64," + recipe.imageUrl}
            alt={recipe.name}
          />
        {:else}
          <img
            class="w-[512px] rounded-lg shadow-lg h-[512px] mx-auto "
            src={noImage}
            alt={recipe.name}
          />
        {/if}
      </Link>

    </div>

        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href={"#slide" + (i - 1)} class="btn btn-circle">❮</a>
          <a href={"#slide" + (i + 1)} class="btn btn-circle">❯</a>
        </div>
      </div>
    {/each}
  </div>

</main>

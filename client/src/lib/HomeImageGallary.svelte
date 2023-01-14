<script lang="ts">
  import { Link } from "svelte-routing";
  import noImage from "../assets/no_image.png";
  export let recipes: Recipe[];
  let sliderPos = 0;

  function handleSliderNext() {
    sliderPos++;
    console.log(sliderPos);
  }

  function handleSliderPrev() {
    sliderPos--;
    console.log(sliderPos);
  }
  //To Fix:seems to be a weird gap in the middle of the picture where the Link doesnt work
</script>

<main>
  <section class="overflow-hidden">
    <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
      <div class="flex flex-wrap m-5 md:-m-2">
        {#each recipes as recipe}
          <div class="flex flex-wrap w-full  md:w-1/2 lg:w-1/3">
            <Link to={"/recipe/" + recipe._id}>
            <div class="w-full mx-auto p-1 md:p-2">
              <h2 class="text text-primary-content">{recipe.name.toUpperCase()}</h2>
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
            </div>
          </Link>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

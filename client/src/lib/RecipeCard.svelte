<script lang="ts">
  import noImage from "../assets/no_image.png";
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
    // @ts-ignore
  } from "@rgossiaux/svelte-headlessui";
  import DiAptana from "svelte-icons/di/DiAptana.svelte";
  import axios from "axios";
  export let showSettings;
  export let recipe: Recipe;
  export let recipeID;
  export let isDeleted: Boolean = false;
  let isHovered: Boolean = false;

  function handleTooltip() {
    isHovered = !isHovered;
  }

  function handleBookmark() {
    //handle bookmark addition and removal here
    console.log("button working");
    axios
      .post("/api/user/removeRecipe", { recipeID })
      .then((res) => console.log("Successfully removed" + res))
      .catch((err) => console.log(err));
    isDeleted = true;
  }
</script>

{#if !isDeleted}
  <main class="">
    <Disclosure
      class="recipe-card p-4 w-auto h-auto card block border border-accent "
    >
      {#if showSettings}
        <div
          class="w-7 hover:rotate-180 hover:scale-125 hover:text-primary-contetn transition-all duration-700 relative"
          on:click={handleBookmark}
          on:keydown={handleBookmark}
          on:mouseenter={handleTooltip}
          on:mouseleave={handleTooltip}
        >
          <DiAptana />
          {#if isHovered}
            <p class="absolute rotate-180">Remove</p>
          {/if}
        </div>
      {/if}

      <DisclosureButton class="text-2xl font-bold mb-4"
        >{recipe.name}
        {#if recipe.imageUrl !== "no_image.png"}
          <img
            class="w-[300px] rounded-lg shadow-lg h-[300px] mx-auto "
            src={"data:image/png;base64," + recipe.imageUrl}
            alt={recipe.name}
          />
        {:else}
          <img
            class="w-[300px] rounded-lg shadow-lg h-[300px] mx-auto "
            src={noImage}
            alt={recipe.name}
          />
        {/if}
      </DisclosureButton>

      <Transition
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-90 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <DisclosurePanel>
          <h3 class="text-xl font-bold mt-4 mb-2 border-t border-t-accent">
            Ingredients:
          </h3>

          <section
            class="grid grid-cols-1 md:grid-cols-2 text-left gap-2 border-t border-t-accent "
          >
            {#each recipe.ingredients.split("-") as ingredient}
              <ul>
                {ingredient}
              </ul>
            {/each}
          </section>
          <h3
            class="text-xl font-bold mt-4 mb-2 border-t border-b border-t-accent border-b-accent"
          >
            Instructions:
          </h3>
          {#each recipe.instructions as step}
            <li class="text-left mt-2">{step}</li>
          {/each}
          <a href={"/recipe/" + recipeID}>
            <button class="btn m-5">Full Screen</button>
          </a>
        </DisclosurePanel>
      </Transition>
    </Disclosure>

    <div />
  </main>
{/if}

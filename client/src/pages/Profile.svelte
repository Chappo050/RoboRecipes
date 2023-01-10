<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import NavBar from "../lib/NavBar.svelte";
  import RecipeContainer from "../lib/RecipeContainer.svelte";
  import Footer from "../lib/Footer.svelte";
  interface Recipe {
    _id?: String;
    name: string;
    imageUrl: string;
    ingredients: string;
    instructions: string;
  }
  let recipes: Recipe[];
  onMount(async () => {
    axios
      .get("/api/user/getSaved")
      .then((res) => (recipes = res.data.recipes))
      .catch((err) => console.log(err));
  });
</script>

<main>
  <NavBar />
  <h1 class="heading text-5xl pt-16 ">Profile</h1>
  <h2 class="text-2xl p-4">Please generate recipies and the ones you save will be displayed here!</h2>
  <body class="place-items-baseline">
    <div>
      {#if recipes}
        <RecipeContainer {recipes} showSettings={true} />
      {/if}
    </div>
  </body>
  <Footer/>
</main>

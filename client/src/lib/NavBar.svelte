<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  // @ts-ignore
  import DiAptana from "svelte-icons/di/DiAptana.svelte";
  import { Link } from "svelte-routing";
  import { storeData } from "../stores";

  function handleLogout() {
    axios
      .get("/api/user/logout")
      .then((res) => ($storeData.loggedIn = false))
      .catch((err) => console.log(err));
  }

  onMount(async () => {
    themeChange(false);
    await axios
      .get("/api/user/auth")
      .then((res) => handleAuth())
      .catch((err) => console.log(err));
    // 👆 false parameter is required for svelte
  });

  function handleAuth() {
    $storeData.loggedIn = true;
  }

  onMount(async () => {});
</script>

<main>
  <nav class="navbar bg-base-200 fixed top-0 left-0 w-full shadow-md z-50">
    <div
      class="container mx-auto px-4 flex items-center justify-between py-2 text-base-content border-b border-b-accent"
    >
      <Link to="/" class="btn btn-ghost text-xl">
        <span class="w-7">
          <DiAptana />
        </span>
        RoboRecipes
      </Link>

     
    <div class="dropdown">
      <label tabindex="0" for="" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg
        >
      </label>
      <ul
        class="menu dropdown-content text-base mt-3 p-2 shadow bg-base-100 rounded-box w-auto -m-10"
      >
        {#if !$storeData.loggedIn}
          <li>
            <Link to="/register" class="">Register</Link>
          </li>
          <li>
            <Link to="/login" class="">Login</Link>
          </li>
        {/if}
        <li>
          <Link to="/generation" class="">Generate</Link>
        </li>

        {#if $storeData.loggedIn}
          <li>
            <Link to="/profile" class="">Profile</Link>
          </li>
          <li>
            <Link on:click={handleLogout} to="/logout" class=""
              >Logout</Link
            >
          </li>
        {/if}
        <select data-choose-theme class="">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="forest">Forest</option>
          <option value="wireframe">Wireframe</option>
          <option value="synthwave">Synthwave</option>
          <option value="luxury">Luxury</option>
        </select>
      </ul>
      
    </div>

      <div class="items-center hidden lg:flex">
        {#if !$storeData.loggedIn}
          <Link to="/register" class="btn btn-ghost">Register</Link>
          <Link to="/login" class="btn btn-ghost">Login</Link>
        {/if}

        <Link to="/generation" class="btn btn-ghost">Generate</Link>
        {#if $storeData.loggedIn}
          <Link to="/profile" class="btn btn-ghost">Profile</Link>
          <Link on:click={handleLogout} to="/logout" class="btn btn-ghost"
            >Logout</Link
          >
        {/if}

        <select data-choose-theme>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="forest">Forest</option>
          <option value="wireframe">Wireframe</option>
          <option value="synthwave">Synthwave</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
    </div>
  </nav>
</main>

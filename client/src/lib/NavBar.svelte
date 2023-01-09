<script lang="ts">
  import axios from "axios";
  import { onMount } from 'svelte'
import { themeChange } from 'theme-change'
  // @ts-ignore
  import DiAptana from "svelte-icons/di/DiAptana.svelte";
  import { Link } from "svelte-routing";
  function handleLogout() {
    axios
      .get("/api/user/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  onMount(() => {
  themeChange(false)
  // 👆 false parameter is required for svelte
})
</script>

<main>
  
  <nav class="navbar bg-base-200 fixed top-0 left-0 w-full shadow-md z-50">
    
    <div class="container mx-auto px-4 flex items-center justify-between py-2 text-base-content border-b border-b-accent">
      <Link to="/" class="btn btn-ghost text-xl">
        <span class="w-7">
          <DiAptana />
        </span>
        RoboRecipes
      </Link>
      
      <div class="flex items-center">
        
        <Link
          to="/register"
          class="btn btn-ghost"
          >Register</Link
        >
        <Link
          to="login"
          class="btn btn-ghost"
          >Login</Link
        >
        <Link
          to="/generation"
          class="btn btn-ghost"
          >Generate</Link
        >
        <Link
          to="/profile"
          class="btn btn-ghost"
          >Profile</Link
        >
        <Link
        on:click={handleLogout}
          to="/logout"
          class="btn btn-ghost"
          >Logout</Link
        >
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

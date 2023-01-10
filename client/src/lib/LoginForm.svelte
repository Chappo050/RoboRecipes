<script lang="ts">
  import axios from "axios";
  import { Link } from "svelte-routing";
  import { storeData } from "../stores";

  let username: string;
  let password: string;

  function submit() {
    console.log(username, password);
    axios
      .post("/api/user/login", { username: username, password: password })
      .then((res) => (  $storeData.loggedIn = true))
      .catch((err) => console.log(err));
  }
</script>

<main>
  {#if !$storeData.loggedIn}
    
 
  <form class="mx-auto w-full max-w-xs" on:submit|preventDefault={submit}>
    <div class="mb-4">
      <label class="block label" for="username"> Username </label>
      <input
        class="input input-bordered label-text text-center"
        id="username"
        type="text"
        placeholder="Username"
        bind:value={username}
      />
    </div>

    <div class="mb-6">
      <label class="block label" for="password"> Password </label>
      <input
        class="input input-bordered label-text text-center"
        id="password"
        type="password"
        placeholder="**********"
        bind:value={password}
      />
    </div>
    <div>
        <button class="btn" type="submit"> Login </button>
    </div>
  </form>
  {:else}
  <Link to="homepage">
    <p class="p-0 link">Return to homepage</p>
   </Link>


  {/if}
</main>

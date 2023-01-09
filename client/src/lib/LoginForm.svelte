<script lang="ts">
  import axios from "axios";
  import { Link } from "svelte-routing";

  let username: string;
  let password: string;
  let isLoggedIn: Boolean = false
  function submit() {
    console.log(username, password);
    axios
      .post("/api/user/login", { username: username, password: password })
      .then((res) => isLoggedIn = true)
      .catch((err) => console.log(err));
  }
  
</script>

<main>
  <form class="mx-auto w-full max-w-xs" on:submit|preventDefault={submit}>
    <div class="mb-4">
      <label class="block label" for="username">
        Username
      </label>
      <input
        class="input input-bordered label-text text-center"
        id="username"
        type="text"
        placeholder="Username"
        bind:value={username}
      />
    </div>

    <div class="mb-6">
      <label class="block label" for="password">
        Password
      </label>
      <input
        class="input input-bordered label-text text-center"
        id="password"
        type="password"
        placeholder="**********"
        bind:value={password}
      />
    </div>
    <div>
      <Link class="text-white" to="/"> 
      <button
        class="btn"
        type="submit"
      >
      Login
      
      </button>
    </Link>
    </div>
  </form>
</main>

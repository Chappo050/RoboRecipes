<script lang="ts">
  import axios from "axios";

  let username: string;
  let email: string;
  let password: string;

  function submit() {
    console.log(username, password);
    axios
      .post("/api/user/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
</script>

<main>
  <form class="form-control gap-4" on:submit|preventDefault={submit}>
    <div>

 
    <label class="block lable" for="username"> Username </label>
    <input
      class="input input-bordered label-text text-center"
      id="username"
      type="text"
      placeholder="Username"
      bind:value={username}
    />
  </div>
  <div>
 
    <label class="block label" for="email"> Email </label>
    <input
      class="input input-bordered label-text text-center"
      id="email"
      type="email"
      placeholder="Email"
      bind:value={email}
    />
   
  </div>
  <div>
 
    <label class="block label" for="password"> Password </label>
    <input
      class="input input-bordered label-text text-center"
      id="password"
      type="password"
      placeholder="**********"
      bind:value={password}
    />
   
  </div>
    <button class="btn" type="submit"> Register </button>
  </form>
</main>

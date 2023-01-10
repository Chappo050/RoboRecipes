<script>
  import { Router, Route } from "svelte-routing";
  import Register from "./pages/Register.svelte";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Generation from "./pages/Generation.svelte";
  import Profile from "./pages/Profile.svelte";
  import SingleRecipePage from "./pages/SingleRecipePage.svelte";
  import ProtectedRoute from "./pages/ProtectedRoute.svelte";

</script>

<Router>
  <Route component={Home} />
  <Route path="/register" component={Register} />
  <Route path="/login" component={Login} />
  <Route path="/generation" component={Generation} />
  <ProtectedRoute path="/profile" component={Profile} />
  <Route path="/recipe/:id" component={SingleRecipePage} />
</Router>

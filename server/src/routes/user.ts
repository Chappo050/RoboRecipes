var express = require("express");
const passport = require("passport");
import * as authCheck from "../authCheck";
import { Router } from 'express';
import * as userController from "../controllers/userController";

export const defaultRoute = Router();


//GET//
/* GET users listing. */
defaultRoute.get("/", userController.init);

defaultRoute.get(
  "/login",
  authCheck.checkNotAuthenticated,
  userController.user_login_get
);

//Check if the current session is still valid   ???
defaultRoute.get("/auth", userController.get_user_logged_in)

defaultRoute.get(
  "/logout", authCheck.checkAuthenticated,
  userController.user_logout
);

defaultRoute.get(
  "/getSaved", authCheck.checkAuthenticated,
  userController.get_users_saved_recipes
);

//POST//

//create new user from form.
defaultRoute.post("/register", userController.register_new_user);

defaultRoute.post(
  "/login", authCheck.checkNotAuthenticated,
  userController.user_login_post
);

//Update//
defaultRoute.post("/removeRecipe", userController.remove_a_saved_recipe)



export default defaultRoute
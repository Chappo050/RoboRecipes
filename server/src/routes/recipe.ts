var express = require("express");
const passport = require("passport");
import { Router } from 'express';
import * as recipeController from "../controllers/recipeController";

export const defaultRoute = Router();


//GET//
defaultRoute.get(
  "/getRandomList",recipeController.get_random_saved_recipes
);

defaultRoute.get(
  "/getRecipeByID",recipeController.get_recipe_by_id
);
//POST//
defaultRoute.post(
  "/saveNewRecipe",recipeController.save_new_recipe
);


export default defaultRoute
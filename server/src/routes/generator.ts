var express = require("express");
const passport = require("passport");
import * as authCheck from "../authCheck";
import { Router } from 'express';
import * as generatorController from "../controllers/generatorController";

export const defaultRoute = Router();


//GET//
/* GET users listing. */
defaultRoute.get("/newRandom", generatorController.newRecipe);

//POST//



export default defaultRoute
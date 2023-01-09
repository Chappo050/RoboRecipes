"use strict";
exports.__esModule = true;
exports.save_new_recipe = void 0;
var recipe_1 = require("../models/recipe");
exports.save_new_recipe = function (req, res, next) {
    console.log(req.body);
    var recipe = new recipe_1["default"](req.body.recipe);
    recipe.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({ message: "Recipe successfully added to database" });
    });
};

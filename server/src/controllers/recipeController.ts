
import Recipe from "../models/recipe";
import  User  from "../models/user";


export const save_new_recipe = (req, res, next) => {

  const recipe = new Recipe({...req.body.recipe});
//Saves the recipe into the database
  recipe.save((err, savedRecipe) => {
    if (err) {
      return next(err);
    }
    if (req.user) {
      //Appends to a users profile if loggedin
      User.updateOne({_id: req.user._id}, {$push: {recipes: savedRecipe._id}}).exec(
        (err) => {
          if (err) {
            return next(err)
          }        
        }
      )
    }
 
    res.json({ message: "Recipe successfully added to database" });
  }); 
};

export const get_random_saved_recipes = (req, res, next) => {

  Recipe.find({}).limit(30).exec( (err, foundData) => {
    if (err) {
      console.log(err);
      next(err)
    }
    if (foundData) {
      res.json(foundData)
    }
  })
};

export const get_recipe_by_id = (req, res, next) => {

  Recipe.findById(req.query._id).exec( (err, foundData) => {
    if (err) {
      console.log(err);
      next(err)
    }
    if (foundData) {
      res.json(foundData)
    }
  })
};
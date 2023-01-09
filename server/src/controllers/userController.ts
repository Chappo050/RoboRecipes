const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator"); //Data parsing
import passport from "passport";

import User from "../models/user";
import Session from "../models/session";
import Recipe from "../models/recipe";

// Display list of all User.
export const init = (req, res, next) => {
  res.json({ Message: "Hello, welcome to the users page" });
};

async function hashPassword(password): Promise<Object> {
  const hashedPassword = await new Promise<String>((resolve, reject) => {
    bcrypt.hash(
      password,
      10,
      function (err, hash) {
        if (err) {
          reject(err);
        }
        console.log(hash);
        
        resolve(hash);
      }
    );
  }) 
  return hashedPassword;
}

// Display list of all User.
export const register_new_user =
  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

  const hashedPassword = await hashPassword(req.body.password)
    console.log(hashedPassword);
    
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      date_registered: Date.now(),
      
    });
    if (!errors.isEmpty()) {
      // There are errors. Return data and erros as JSON
      res.json({
        user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if User with same name already exists.
       User.findOne({ username: req.body.username }).exec(
        (err, found_message_copy) => {
    
          if (err) {
            console.log('here');
            return next(err);
          }

          if (found_message_copy) {
            // User exists
            res.json({ message: "Username already exists." });
          } else {
            user.save((err) => {
              if (err) {
                return next(err);
              }
              res.json({ message: "User successfully added to database" });
            });
          }
        }
      );
    }
  }

export const user_login_post = (req, res, next) => {
  console.log(req.body);
  
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
};

export const user_login_get = (req, res, next) => {
  res.json({
    Message: "Hello, welcome to the users login page :). Please sign in",
  });
};

export const user_logout = (req, res) => {
  res.clearCookie("connect.sid").json("Logged out");
};

export const get_user_logged_in = (req, res, next) => {
  if (!req.user.id) {
    res.status(403).json("Could not find user. Please log in");
  }
  const query = req.user.id;

  Session.findOne({ session: { $regex: query, $options: "i" } }).exec(
    (err, user) => {
      if (err) {
        return next(err);
      }

      if (user) {
        // User session exists. Extract time
        if (user.expires.valueOf() > Date.now().valueOf()) {
          res.status(200).json({ message: "Users session is still valid" });
        } else {
          res
            .status(403)
            .json({ message: "User found, session expired. Access forbidden" });
        }
      } else {
        res.status(403).json({ message: "User not found. Access forbidden" });
      }
    }
  );
};

export const get_users_saved_recipes = (req, res, next) => {

  User.findById(req.user._id).populate('recipes').exec( (err, foundData) => {
    if (err) {
      console.log(err);
      next(err)
    }
    if (foundData) {
      console.log(foundData);
      res.json(foundData)
    }
  })
};

export const remove_a_saved_recipe = (req, res, next) => {

  User.findByIdAndUpdate(req.user._id, {$pull: {recipes: req.body.recipeID}},).populate('recipes').exec( (err, foundData) => {
    if (err) {
      console.log(err);
      next(err)
    }
    if (foundData) {
      console.log(foundData);
      res.json(foundData)
    }
  })
};


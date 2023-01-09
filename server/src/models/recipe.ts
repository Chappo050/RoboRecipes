import mongoose from "mongoose";
import {IUser, UserSchema} from "./user";
const Schema = mongoose.Schema;

export interface IRecipe extends mongoose.Document {
  name: String;
  imageUrl: String;
  ingredients: String;
  instructions: String[];
  users: IUser[];
};

export const RecipeSchema = new Schema(
  {
    name: {type:String},
    imageUrl:{type:String},
    ingredients: {type:String},
    instructions: [{type:String}],
    users: [{type: Schema.Types.ObjectId, ref: "User"}],
  }
);


//Export model
const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema)
export default Recipe

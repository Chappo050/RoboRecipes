import mongoose from "mongoose";
import { IRecipe, RecipeSchema } from "./recipe";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  username: String;
  email: String;
  password: String;
  date_registered:Date;
  recipes: IRecipe[];
};


export const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date_registered: { type: Date, default: Date.now },
    recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  }
);

//Export model
const User = mongoose.model<IUser>('User', UserSchema)
export default User

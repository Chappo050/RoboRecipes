import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ISession extends mongoose.Document {
  expires: Date;
  session: String;
};

export const SessionSchema = new Schema(
  {
    expires: { type: Date, required: true },
    session: { type: String, required: true },
  }
);


//Export model
const Session = mongoose.model<ISession>('Session', SessionSchema)
export default Session

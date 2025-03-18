import connectDB from "../config/db";
import { User } from "./userModels";
import { Model } from "mongoose";

export const authdb: { connect: () => Promise<void>; user: Model<any> } = {
  connect: connectDB,
  user: User,  
};

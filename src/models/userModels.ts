import mongoose from "mongoose";
import { OAuthProvider } from "../oauth/providers/provider";

export enum UserRole {
  admin = "admin",
  user = "user",
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.user,
  },
  password: {
    type: String,
    required: false,
  },
  accounts: {
    type: [
      {
        provider: { type: String, required: true },
        providerId: { type: String, required: true },
      },
    ],
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);

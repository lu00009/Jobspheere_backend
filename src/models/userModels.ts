import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required : true,
    unique : true 
  },
  password:{
    type: String,
    required : true
  },
  name : {
    type: String,
    required: true
  },
  role:{
    type: String,
    required : true,
    enum: ["USER","ADMIN"],
    default : "USER"
  }
})

export const User = mongoose.model("User", userSchema) 
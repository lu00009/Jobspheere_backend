import { Request, Response } from "express"
import { User } from "../models/userModels"
import bcrypt from 'bcrypt'
import { JWT } from "../config/db"
import jwt from 'jsonwebtoken'

export const registerUser = async(req: Request, res: Response):Promise<Response>=>{
  const {password,...data} = req.body
  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new User({
    email: data.email,
    password : hashedPassword,
    name : data.name
  })        
  await newUser.save()
  const token = jwt.sign({id: newUser._id},JWT)
  const {password: userPass, ...newData} = newUser.toObject() 

  return res.json({data:newData, token})
}

export const loginUser = async(req: Request, res: Response):Promise<Response>=>{
  const {email, password}= req.body
  const user = await User.findOne({email})

  if(!user) return res.status(404).json({message:"User not found"})

  const isMatching = await bcrypt.compare(password, user.password)

  if(!isMatching){
    return res.status(400).json({message:"Incorrect password"})
  } 

  const token = jwt.sign({id:user._id}, JWT)
  const {password: userPass, ...data}= user.toObject() 
  return res.json({ data, token });


}

export const protectedUser = async(req: Request, res:Response): Promise<Response>=>{
  const user = req.user;

  return res.json({
    message: "Heyy, you have accessed the protected route",
    user,
  });
}


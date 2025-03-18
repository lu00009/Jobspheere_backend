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
    name : data.name,
    
  })        
  await newUser.save()
  const token = jwt.sign({id: newUser._id},JWT)
  const {password: userPass, ...newData} = newUser.toObject() 

  return res.json({data:newData, token, message:"Registered successfully"})
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
  return res.json({ data, token, message:"Logged in successfully" });


}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const jobs = await User.find();
    return res.status(200).json(jobs);  
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(204).json({ message: 'Job deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



export const protectedUser = async(req: Request, res:Response): Promise<any>=>{
  // const user = req.user;

  return res.json({
    message: "Heyy, you have accessed the protected route",
    // user,
  });
}


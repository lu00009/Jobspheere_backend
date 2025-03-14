import { JWT } from "../config/db";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModels";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: any;
  }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const authorizeHeader = req.headers["authorization"]

  if (!authorizeHeader) return res.status(401).json({ message: "Unauthorized" })

  const token = authorizeHeader.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, JWT)
    console.log(`decoded ${decoded}`)
    const userId = (decoded as jwt.JwtPayload).id
    const user = await User.findOne({ _id: userId })

    if (!user) return res.status(400).json({ message: "user not found" })

    req.user = user
    next()
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid token" })
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {


  if (!req.user) {
    console.log("User is undefined in isAdmin");
    return res.status(403).json({ message: "Unauthorized - No user data" });
  }

  if (req.user.role === "admin") {
    next();
  } else {
    console.log("User is not an admin, access denied");
    res.status(403).json({ message: "Access denied. Only admins can perform this action." });
  }
};

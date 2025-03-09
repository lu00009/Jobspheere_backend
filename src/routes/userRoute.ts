import { registerUser, loginUser } from "../controllers/userController"
const express = require('express')
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser )


export default userRouter
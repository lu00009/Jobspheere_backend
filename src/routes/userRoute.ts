import { registerUser, loginUser, protectedUser} from "../controllers/userController"
import { authenticate } from "../middleware/authenticate"
import { loginValidation, registerValidation } from "../middleware/userValidation"
import { validate } from "../middleware/validator"
const express = require('express')
const userRouter = express.Router()

userRouter.post('/register',registerValidation,validate, registerUser)
userRouter.post('/login', loginValidation, validate, loginUser )
userRouter.post('/protected',authenticate, protectedUser)


export default userRouter
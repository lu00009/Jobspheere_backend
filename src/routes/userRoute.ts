import { registerUser, loginUser, protectedUser, getUser, updateUser, deleteUser} from "../controllers/userController"
import { authenticate } from "../middleware/authenticateMiddleware"
import {errorLoginHandler, errorRegisterHandler} from "../middleware/errorHandlerMiddleware"
import { loginValidation, registerValidation} from "../middleware/userValidationMiddleware"
const express = require('express')
const userRouter = express.Router()

userRouter.post('/',registerValidation(), errorRegisterHandler, registerUser)
userRouter.get('/', getUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/login', loginValidation(),errorLoginHandler, loginUser )
userRouter.post('/protected',authenticate, protectedUser)


export default userRouter
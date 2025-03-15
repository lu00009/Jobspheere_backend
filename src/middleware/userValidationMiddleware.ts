import { body } from 'express-validator';
import { User } from '../models/userModels';
import { error } from 'console';


export const registerValidation = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3, max: 50 }),
  body("email").trim().isEmail().withMessage("Invalid Email").custom(async (email) => {
    const user = await User.findOne({ email })
    if (user) throw new error()
  }).withMessage("email already in use")
  ,
  body("password")
    .trim()
    .notEmpty().withMessage("Password is Required")
    .isLength({ min: 8, max: 20 }).withMessage("Password must be between 8 and 20 characters"),
  body("role").trim().toLowerCase()
];

export const loginValidation = () => [
  body("email").trim().isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({
      min: 8,
      max: 20,
    }).withMessage("Password must be between 8 and 20 characters"),

];


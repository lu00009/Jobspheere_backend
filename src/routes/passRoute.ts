import { forgot_pass, reset_pass } from "../controllers/forgotPassword";

const express = require('express')
export const passRouter= express.Router()
passRouter.post("/forgot_pass",forgot_pass);
passRouter.post("/reset_pass/:token",reset_pass);
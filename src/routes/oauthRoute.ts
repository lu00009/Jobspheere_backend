import express from "express"
import { createUrl, handleOAuth } from "../controllers/oauthController"
import { protectedUser } from "../controllers/userController"
export const oauthRouter = express.Router()

oauthRouter.get("/url/:provider", createUrl)
oauthRouter.get("/redirect/:provider", handleOAuth)
oauthRouter.get("/", protectedUser)
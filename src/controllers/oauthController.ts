import { asyncHandler } from "../middleware/async-handler";
import { NextFunction, Request, Response } from "express";
import { getOAuthClient, OAuthProvider } from "../oauth/providers/provider";
import { connectUserToAccount } from "../services/oauth.service"; 
import { generateAuthJwtToken } from "../services/generatejwttoken";

export const createUrl = asyncHandler((req: Request, res: Response)=>{
  const provider = req.params.provider as OAuthProvider
  const oAuthClient = getOAuthClient(provider)
  const url = oAuthClient.createAuthUrl()
  res.json({url})
})

export const handleOAuth = async(req: Request, res: Response, next: NextFunction)=>{
  const provider = req.params.provider as OAuthProvider
  const code = req.query.code as string
  if (!code) {
    res.status(400).send('Missing code parameter.');
    return;}
    console.log("Received code:", code);
  try{
    const oAuthClient = getOAuthClient(provider)
    const oAuthUser = await oAuthClient.fetchUser(code) 
    console.log(oAuthUser)
    const user = await connectUserToAccount(
      {email: oAuthUser.data.email,
        name: oAuthUser.data.name
    },{
      provider: provider,
      providerId: oAuthUser.data.id
    })
  const {accessToken} = await generateAuthJwtToken(user._id as unknown as string)
  res.cookie("access-token", accessToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
 res.redirect("http://localhost:3002/oauth")
  
  }
  catch (error) {
    console.error(error)
    res.redirect(
        `http://localhost:3002/login?oauthError=${encodeURIComponent(
            "Failed to connect. Please try again."
        )}`)}
}
import { OAuthProvider } from "../providers/provider";
import {z} from 'zod'
// import { AbortController } from 'abort-controller';
import { redirectURL } from "../../config/db";
export class OAuthClient<T>{
  private readonly provider: OAuthProvider
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly scopes: string[]

  private readonly urls:{
    auth: string
    token: string
    user: string
  }

  private readonly userInfo:{
    schema: z.ZodSchema<T>
    parser: (data: T) =>{id: string; email: string; name: string}
  }

  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string()
  })

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo
  }:{
    provider: OAuthProvider
    clientId: string
    clientSecret: string
    scopes: string[]
    urls: {
      auth: string
      token: string
      user: string
    }
    userInfo: {
      schema: z.ZodSchema<T>
      parser: (data: T) => {id: string; email: string; name: string} 
    }
  }){
    this.provider = provider
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.scopes = scopes
    this.urls = urls
    this.userInfo = userInfo
  }
  private get redirectUrl(){
    if (!redirectURL) throw new Error("Missing redirectURL environment variable")
    return `${redirectURL}/${this.provider}`
  }
  

  private async fetchToken(code: string) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // Timeout after 5 seconds
  
    try {
      const res = await fetch(this.urls.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          code,
          redirect_uri: this.redirectUrl.toString(),
          grant_type: "authorization_code",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
        signal: controller.signal, // Attach the abort signal to the fetch request
      });
    
      clearTimeout(timeout); // Clear timeout once the request is complete
    
      // Check if the response is successful
      if (!res.ok) {
        const errorBody = await res.text();
        console.error("Request failed:", res.status, errorBody);
        throw new Error(`Request failed with status: ${res.status}`);
      }
    
      const rawData = await res.json();
      console.log("Token response:", rawData);
    
      const { data, success, error } = this.tokenSchema.safeParse(rawData);
      if (!success) {
        console.error("Token validation failed:", error);
        throw new InvalidTokenError(error);
      }
    
      return {
        accessToken: data.access_token,
        accessType: data.token_type,
      };
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request timed out");
        throw new Error("Request timed out");
      } else {
        console.error("Error fetching token:", error);
        throw new Error("An error occurred while fetching the token");
      }
    } finally {
      clearTimeout(timeout); // Ensure timeout is always cleared
    }
    
  }

 createAuthUrl(){
  const url = new URL(this.urls.auth)
  url.searchParams.set("client_id", this.clientId)
  url.searchParams.set("redirect_uri", this.redirectUrl)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("scope", this.scopes.join(" "))
  return url.toString()
 }

async fetchUser(code: string){
  const {accessToken, accessType } = await this.fetchToken(code)
  const res  = await fetch(this.urls.user,{
    headers:{
      Authorization: `${accessType} ${accessToken}`
    }
  })
  const rawData = await res.json()
  console.log('raw data', rawData)
  const {data, success, error} = this. userInfo.schema.safeParse(rawData)
  if(!success) throw new InvalidUserError(error)
  return{
      data
}}
  
}
class InvalidTokenError extends Error {
  cause: z.ZodError;

  constructor(zodError: z.ZodError) {
    super("Invalid Token")
    this.cause = zodError
  }}

 class InvalidUserError extends Error {
    cause: z.ZodError;
  
    constructor(zodError: z.ZodError) {
      super("Invalid User")
      this.cause = zodError
    }
  }
import { Request, Response } from "express"

const uploadFile = async(req:Request, res:Response, file:File): Promise<void>=>{
  res.json(req.file)

}
export default uploadFile
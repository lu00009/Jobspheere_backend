import uploadFile from "../controllers/uploadController"
import upload from "../config/multer"
const express = require('express')


const uploadRouter = express.Router()

uploadRouter.post('/upload',upload.single('file'),uploadFile)
uploadRouter.post('/upload/multiple',upload.array('file',2),uploadFile)


export default uploadRouter
import { createJob, getJobs, updateJobs, deleteJob, getJobById} from '../controllers/jobController';
import  {validateJob}  from '../middleware/jobValidationMiddleware';
import {errorJobHandler} from  '../middleware/errorHandlerMiddleware';
import upload from '../config/multer';
import { authenticate, isAdmin } from '../middleware/authenticateMiddleware';
const express = require('express')

const jobRouter = express.Router();

jobRouter.post('/',upload.single('logo'),authenticate,isAdmin,validateJob,errorJobHandler, createJob);
jobRouter.get('/', getJobs);
jobRouter.put('/:id', updateJobs);
jobRouter.delete('/:id', deleteJob);
jobRouter.get('/:id', getJobById);

export default jobRouter;

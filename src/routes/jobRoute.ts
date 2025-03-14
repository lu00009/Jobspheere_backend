import { createJob, getJobs, updateJobs, deleteJob, getJobById} from '../controllers/jobController';
import  {validateJob}  from '../middleware/jobValidationMiddleware';
import errorHandler from  '../middleware/errorHandlerMiddleware';
import upload from '../config/multer';
const express = require('express')

const jobRouter = express.Router();

jobRouter.post('/',upload.single('logo'),validateJob,errorHandler, createJob);
jobRouter.get('/', getJobs);
jobRouter.put('/:id', updateJobs);
jobRouter.delete('/:id', deleteJob);
jobRouter.get('/:id', getJobById);

export default jobRouter;

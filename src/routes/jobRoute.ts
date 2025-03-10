import { createJob, getJobs, updateJobs, deleteJob, getJobById} from '../controllers/jobController';
import  {validateJob}  from '../middleware/jobValidation';
import errorHandler from  '../middleware/errorHandler';
const express = require('express')

const jobRouter = express.Router();

jobRouter.post('/',validateJob,errorHandler, createJob);
jobRouter.get('/', getJobs);
jobRouter.put('/:id', updateJobs);
jobRouter.delete('/:id', deleteJob);
jobRouter.get('/:id', getJobById);

export default jobRouter;

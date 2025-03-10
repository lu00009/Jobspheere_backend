import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import jobRoute from './routes/jobRoute';
import userRoute from './routes/userRoute'
import uploadRouter from './routes/uploadRoute';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(cors({ origin: 'http://localhost:5001' })); 


app.use("/api/jobs", jobRoute);
app.use("/api", userRoute)
app.use('/api',uploadRouter)

export default app;

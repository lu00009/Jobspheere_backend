import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import jobRoute from './routes/jobRoute';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(cors({ origin: 'http://localhost:5001' })); 


app.use("/api/jobs", jobRoute);

export default app;

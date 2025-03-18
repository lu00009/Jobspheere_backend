import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import jobRoute from './routes/jobRoute';
import userRouter from './routes/userRoute';
import { oauthRouter } from './routes/oauthRoute';


connectDB();

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(cors({ origin: 'http://localhost:3002' })); 


app.use("/api/jobs", jobRoute);
app.use("/api/users", userRouter)
app.use("/oauth",oauthRouter)
// app.use('/uploads/:path', express.static('../uploads'))

export default app;

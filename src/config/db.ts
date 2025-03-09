import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 
export const JWT = process.env.JWT_SECRET;
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      minPoolSize : 10
    } as mongoose.ConnectOptions);

    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); 
  }
};

export default connectDB;

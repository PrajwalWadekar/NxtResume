import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export const connectDB = async () =>{
   await mongoose.connect(process.env.MONGODB_URI)
   .then(()=>console.log("MongoDB connected"))
}
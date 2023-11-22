import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.router.js"
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json());

app.listen(4000,()=>{
    console.log("Server is running on port 4000!")
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.router.js"
import listingRouter from "./routes/listing.router.js"
import cookieParser from "cookie-parser";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(4000,()=>{
    console.log("Server is running on port 4000!")
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);


// middleware for error---
app.use((err,req,resp,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return resp.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })      // key aur value same hone pr kewal key bhej skte h
})
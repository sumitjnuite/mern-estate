import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup = async (req, resp,next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({ username, email, password:hashedPassword });
    try {
        await newUser.save();
        resp.status(201).json("user created succesfully!");
    } catch (error) {
        // resp.status(500).json(error.message);
        // next(error);
        next(errorHandler(600,"Custom Error for Duplicate"))
    }
}
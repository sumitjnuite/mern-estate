import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, resp, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        resp.status(201).json("user created succesfully!");
    } catch (error) {
        // resp.status(500).json(error.message);
        // next(error);
        next(errorHandler(600, "Error in adding new user"));
    }
};

export const signin = async (req, resp, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not Found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "wrong credential!"));

        // remove password from resp
        const { password: pass, ...rest } = validUser._doc;

        // first parameter should be unique related to user
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        resp
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest); // httpOnly true isliye taki 3rd party app is cookie ko access na kr paayen
    } catch (error) {
        next(error);
    }
};

export const google = async (req, resp, next) => {
    const { name, email, photo } = req.body;
    try {
        // first check that user is already existed or not
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); 
            const { password: pass, ...rest } = user._doc;
            resp
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            // google se password nahi milega.. hashed password generate kro
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            // google se name milega usko username me convert kro
            const newUser = new User({
                username:
                    name.split(" ").join("").toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email,
                photo,
                password: hashedPassword,
            });

            await newUser.save();     // user ko database me save kro
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);       // ek random token generate kro using jwt
            const { password: pass, ...rest } = newUser._doc;
            // is token ko cookie ke form me resp kro
            resp
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req,resp)=>{
    resp.send({message:"test api is working..."})
}

export const updateUser = async (req,resp,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can update only your account."));

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                photo:req.body.photo
            }
        },{new:true})

        const {password, ...rest} = updatedUser._doc;
        resp.status(200).json(rest);

    } catch (error) {
        next(error);
    }

}

export const deleteUser = async(req,resp,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can delete only your own account."));

    try {
        await User.findByIdAndDelete(req.params.id);
        resp.clearCookie('access_token');
        resp.status(200).json('User has been deleted');

    } catch (error) {
        next(error);
    }
}

export const getUserListings = async (req,resp,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can see only your listings."));

    try {
        const listings = await Listing.find({userRef:req.params.id});
        resp.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req,resp,next)=>{
    try {
        const listing = await Listing.create(req.body);
        return resp.status(201).json(listing);
        
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async(req,resp,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing not Find"));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"You can delete only your listings!"));
    }

    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        return resp.status(201).json("Listing has been deleted");
        
    } catch (error) {
        next(error);
    }
        
        
    
};
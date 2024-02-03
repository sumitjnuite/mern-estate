import Listing from "../models/listing.model.js";

export const createListing = async(req,resp,next)=>{
    try {
        const listing = await Listing.create(req.body);
        return resp.status(201).json(listing);
        
    } catch (error) {
        next(error);
    }
}
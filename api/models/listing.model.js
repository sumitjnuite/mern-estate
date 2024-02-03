import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    regularPrice:{
        type:Number,
        required: true,
    },
    discountPrice:{
        type:Number,
        required: true,
    },
    bathrooms:{
        type:Number,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true,
    },

    // rent or sell
    type:{
        type:String,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    imageUrls:{
        type:Array,
        required:true,
    },
    // which user has created the listing
    userRef:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Listing = mongoose.model('Listing',ListingSchema);
export default Listing;
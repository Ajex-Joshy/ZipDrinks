import mongoose from "mongoose"

const bannerSchema = new mongoose.Schema({
    title : {
        type : String,
        requried : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    isListed : {
        type : Boolean,
        default : true
    },
},
{
    timestamps : true
})

const bannerModel = mongoose.model.banners || mongoose.model("banners" , bannerSchema)

export default bannerModel
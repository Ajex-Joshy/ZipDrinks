import mongoose from "mongoose"

const wishlistSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "products",
                required : true
            },
            addedAt : {
                type : Date,
                default : Date.now
            }
        }
    ]
},
{
    timestamps : true
})


const wishlistModel = mongoose.model.wishlists || mongoose.model("wishlists" , wishlistSchema)
export default wishlistModel
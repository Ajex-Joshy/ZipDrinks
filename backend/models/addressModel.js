import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    fullname : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    landmark : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},
{
    timestamps : true
})

const addressModel = mongoose.model.address || mongoose.model("address" , addressSchema);

export default addressModel


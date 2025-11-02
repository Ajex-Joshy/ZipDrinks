import categoryModel from "../../models/categoryModel.js"


export const getUserCategoriesService = async (req , res)=>{
    try {

        let categories = await categoryModel.find({ isListed : true})

        if(!categories){
            return res.status(404).json({success : false , message : "Something went wrong !"})
        }

        res.status(200).json({success : true , message : "category fetched successfully" , categories})
        
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}
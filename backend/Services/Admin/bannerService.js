import bannerModel from "../../models/bannerModel.js"


export const addBannerService = async(title , description , image)=>{
    try {

        const banner = await bannerModel.create({title , description , image})

        if(!banner){
            return false
        }

        return banner
        
    } catch (error) {
        return false
    }
}


export const getBannerService = async(search , filter , page = 1 , limit = 0)=>{
    try {

        const skip = (page - 1) * limit

        let query = {}

        if(search){
            query.title = {$regex : search , $options : "i"}
        }

        if(filter == "active"){
            query.isListed = true
        }
        else if (filter == "inactive"){
            query.isListed = false
        }

        const banners = await bannerModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit)

        const totalCount = await bannerModel.countDocuments(query)

        if(!banners){
            return false 
        }

        return {banners , totalCount}
        
    } catch (error) {
        return false
    }
}


export const getSingleBannerService = async(id)=>{
    try {

        const banner = await bannerModel.findById(id)

        if(!banner){
            return false
        }

        return banner
        
    } catch (error) {
        return false
    }
}


export const editBannerService = async(id , title , description , image)=>{
    try {

        const banner = await bannerModel.findByIdAndUpdate(id , { title , description , image} , { new : true})

        if(!banner){
            return false
        }

        return banner
        
    } catch (error) {
        return false
    }
}


export const listUnlistBannerService = async(id)=>{
    try {

        const banner = await bannerModel.findById(id)

        if(!banner){
            return false
        }

        banner.isListed = !banner.isListed
        await banner.save()

        return banner
        
    } catch (error) {
        return false
    }
}


export const deleteBannerService = async(id)=>{
    try {

        const banner = await bannerModel.findByIdAndDelete(id)

        if(!banner){
            return false 
        }

        return banner
        
    } catch (error) {
        return false
    }
}
import { addToWishlistService, getWishlistsServices, removeAllWishListService, removeWishlistService } from "../../Services/User/wishlistService.js"


export const addToWishlist = async(req , res)=>{
    await addToWishlistService(req , res)
}

export const getWishlists = async(req , res)=>{
    await getWishlistsServices(req , res)
}

export const removeWishlist = async(req , res)=>{
    await removeWishlistService(req , res)
}

export const removeAllWishList = async(req , res)=>{
    await removeAllWishListService(req , res)
}
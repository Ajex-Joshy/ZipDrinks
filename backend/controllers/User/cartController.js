import { addToCartService, clearCartService, decrementCartService, getCartItemsService, removeFromCartService } from "../../Services/User/cartService.js"


export const addToCart = async(req , res)=>{
    await addToCartService(req , res)
}

export const getCartItems = async(req , res)=>{
    await getCartItemsService(req , res)
}

export const decrementCart = async(req , res)=>{
    await decrementCartService(req , res)
}

export const removeFromCart = async(req , res)=>{
    await removeFromCartService(req , res)
}

export const clearCart = async(req , res)=>{
    await clearCartService(req , res)
}
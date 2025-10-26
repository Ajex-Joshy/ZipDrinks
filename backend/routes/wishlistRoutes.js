import express from "express"
import { addToWishlist, getWishlists, removeAllWishList, removeWishlist } from "../controllers/User/wishlistController.js"
import { getUserId, userAuth } from "../middlewares/User/userAuth.js"

const wishlistRouter = express.Router()

wishlistRouter.post('/' , userAuth , addToWishlist)
wishlistRouter.get('/' , getUserId , getWishlists)
wishlistRouter.delete('/:productId' , getUserId , removeWishlist)
wishlistRouter.delete('/' , getUserId , removeAllWishList)

export default wishlistRouter
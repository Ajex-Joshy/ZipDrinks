import express from "express";
import { getUserId, userAuth } from "../middlewares/User/userAuth.js";
import { addToCart, clearCart, decrementCart, getCartItems, removeFromCart } from "../controllers/User/cartController.js";

const cartRouter = express.Router()

cartRouter.post('/' , userAuth , addToCart)
cartRouter.get('/' , getUserId , getCartItems)
cartRouter.patch('/' , userAuth , decrementCart)
cartRouter.put('/' , userAuth , removeFromCart)
cartRouter.delete('/' , getUserId , clearCart)

export default cartRouter
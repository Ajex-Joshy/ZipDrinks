import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/UserSlice.js"
import adminReducer from "./Admin/AdminSlice.js"
import productReducer from "./user/Products.js"
import wishlistReducer from "./user/wishlist.js"
import cartReducer from "./user/cartSlice.js"

const store = configureStore({
    reducer : {
        user : userReducer,
        admin : adminReducer,
        product : productReducer,
        wishlist : wishlistReducer,
        cart : cartReducer
    }
})

export default store;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helper/AxiosInstance"


const initialState = {
    loading : false,
    wishlistData : null,
    error : null
}

export const fetchWishList = createAsyncThunk( 'wishlist/fetchwishlist' , async (_ , {rejectWithValue})=>{

    try {

        const {data} = await axiosInstance.get('/api/wishlist')

        if(data.success){
            return data.wishlist
        }
        
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const wishlistSlice = createSlice({
    name : "wishlist",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(fetchWishList.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchWishList.fulfilled , (state , action)=>{
                state.wishlistData = action.payload
                state.loading = false
            })
            .addCase(fetchWishList.rejected , (state , action)=>{
                state.error = action.payload
                state.loading = false
            })
    }
})

export default wishlistSlice.reducer
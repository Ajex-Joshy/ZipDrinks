import { addCouponService, couponStatusService, deleteCouponService, getCouponsService, getSingleCouponService, updateCouponService } from "../../Services/Admin/couponService.js"


// add coupons

export const addCoupon = async(req , res)=>{
    await addCouponService(req , res)
}

// get all coupons

export const getCoupons = async(req , res)=>{
    await getCouponsService(req , res)
}

// get single coupon

export const getSingleCoupon = async(req , res)=>{
    await getSingleCouponService(req , res)
}

// update coupon

export const updateCoupon = async(req , res)=>{
    await updateCouponService(req , res)
}

// coupon status

export const couponStatus = async(req , res)=>{
    await couponStatusService(req , res)
}

// delete coupon
export const deleteCoupon = async(req , res)=>{
    await deleteCouponService(req , res)
}
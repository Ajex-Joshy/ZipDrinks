import express from "express"
import { addCoupon, couponStatus, deleteCoupon, getCoupons, getSingleCoupon, updateCoupon } from "../../controllers/Admin/couponController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminCouponRouter = express.Router()

AdminCouponRouter.use(getAdminId)

AdminCouponRouter.post('/add-coupon' , addCoupon)
AdminCouponRouter.get('/' , getCoupons)
AdminCouponRouter.get('/:couponId' , getSingleCoupon)
AdminCouponRouter.put('/:couponId' , updateCoupon)
AdminCouponRouter.patch('/:couponId/status' , couponStatus)
AdminCouponRouter.patch('/:couponId' , deleteCoupon)

export default AdminCouponRouter
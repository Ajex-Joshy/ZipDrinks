import express from "express"
import { approveOrderItemReturn, approveOrderReturn, changeOrderStatus, getOrders, getSingleOrder } from "../../controllers/Admin/orderController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminOrderRouter = express.Router()

AdminOrderRouter.use(getAdminId)

AdminOrderRouter.get('/' , getOrders)
AdminOrderRouter.get('/:orderId' , getSingleOrder)
AdminOrderRouter.put('/:orderId/status' , changeOrderStatus)
AdminOrderRouter.patch('/:orderId/return' , approveOrderReturn)
AdminOrderRouter.patch('/:orderId/return-item' , approveOrderItemReturn)

export default AdminOrderRouter
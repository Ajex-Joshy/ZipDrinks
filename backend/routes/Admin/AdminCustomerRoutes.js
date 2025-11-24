import express from "express"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"
import { blockUnblockCustomer, getCustomers } from "../../controllers/Admin/customersController.js"

const AdminCustomerRouter = express.Router()

AdminCustomerRouter.use(getAdminId)

AdminCustomerRouter.get('/' , getCustomers)
AdminCustomerRouter.patch('/:customerId/status' , blockUnblockCustomer)

export default AdminCustomerRouter
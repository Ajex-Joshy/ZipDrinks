import express from "express"
import { generateSalesExcel, generateSalesPdf, getSales } from "../../controllers/Admin/salesController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminSalesRouter = express.Router()

AdminSalesRouter.use(getAdminId)

AdminSalesRouter.get('/' , getSales)
AdminSalesRouter.get('/download-pdf' , generateSalesPdf)
AdminSalesRouter.get('/download-excel' , generateSalesExcel)

export default AdminSalesRouter
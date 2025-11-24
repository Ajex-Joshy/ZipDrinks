import express from "express"
import { getAdminData } from "../../controllers/Admin/adminDataController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminDataRouter = express.Router()

AdminDataRouter.get('/' , getAdminId , getAdminData)

export default AdminDataRouter
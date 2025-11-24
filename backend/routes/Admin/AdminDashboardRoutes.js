import express from "express"
import { getAdminDashboard } from "../../controllers/Admin/dashboradController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminDashboardRouter = express.Router()

AdminDashboardRouter.get('/' , getAdminId , getAdminDashboard)

export default AdminDashboardRouter

import express from "express"
import { adminLogin, adminLogout } from "../../controllers/Admin/authAdminController.js";

const AdminAuthRouter = express.Router()

AdminAuthRouter.post('/login' , adminLogin);
AdminAuthRouter.post('/logout' , adminLogout);

export default AdminAuthRouter
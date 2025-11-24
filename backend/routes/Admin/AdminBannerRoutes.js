import express from "express"
import { addBanner, deleteBanner, editBanner, getBanner, getSingleBanner, listUnlistBanner } from "../../controllers/Admin/bannerController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminBannerRouter = express.Router()

AdminBannerRouter.use(getAdminId)

AdminBannerRouter.post('/add-banner' , addBanner)
AdminBannerRouter.get('/' , getBanner)
AdminBannerRouter.get('/:id' , getSingleBanner)
AdminBannerRouter.put('/:id/edit' , editBanner)
AdminBannerRouter.patch('/:id/status' , listUnlistBanner)
AdminBannerRouter.delete('/:id/delete' , deleteBanner)

export default AdminBannerRouter
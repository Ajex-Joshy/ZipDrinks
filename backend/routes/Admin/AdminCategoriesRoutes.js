import express from "express"
import { addCategory, categoryListUnlist, getCategories, singleCategory, updateCategory } from "../../controllers/Admin/CategoryController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminCategoriesRouter = express.Router()

AdminCategoriesRouter.use(getAdminId)

AdminCategoriesRouter.post('/add-category' , addCategory)
AdminCategoriesRouter.get('/' , getCategories)
AdminCategoriesRouter.patch('/:categoryId/status' , categoryListUnlist)
AdminCategoriesRouter.get('/:categoryId' , singleCategory);
AdminCategoriesRouter.put('/:categoryId' , updateCategory)

export default AdminCategoriesRouter
import express from "express"
import { addProducts, getProducts, productListUnlist, singleProduct, updateProduct } from "../../controllers/Admin/productController.js"
import { getAdminId } from "../../middlewares/Admin/adminAuth.js"

const AdminProductsRouter = express.Router()

AdminProductsRouter.use(getAdminId)

AdminProductsRouter.post('/add-product' , addProducts)
AdminProductsRouter.get('/' , getProducts)
AdminProductsRouter.patch('/:productId' , productListUnlist)
AdminProductsRouter.get('/:productId' , singleProduct)
AdminProductsRouter.put('/:productId' , updateProduct)

export default AdminProductsRouter
import express from "express"
import { checkUser, getUserId } from "../../middlewares/User/userAuth.js"
import { getUserWallet } from "../../controllers/User/walletController.js"

const walletRouter = express.Router()

walletRouter.use(checkUser)

walletRouter.get('/' , getUserId , getUserWallet)

export default walletRouter
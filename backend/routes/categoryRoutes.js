
import express from "express";
import { getUserCategories } from "../controllers/User/categoryController.js";

const categoryRouter = express.Router()

categoryRouter.get('/' , getUserCategories)

export default categoryRouter
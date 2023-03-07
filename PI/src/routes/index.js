import { Router } from "express";
import ProductRouter from "./products.router.js"
import CartRouter from "./carts.router.js"

const router = Router()

router.use('/api/products', ProductRouter)
router.use('/api/carts', CartRouter)



export default router
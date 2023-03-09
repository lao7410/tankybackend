import { Router } from "express";
import ProductRouter from "./productsRouter.js"
import CartRouter from "./cartsRouter.js"
import uploader from "../utils/uploader.js";

const router = Router()

router.use('/api/products', ProductRouter)
router.use('/api/carts', CartRouter)
router.get('/home', uploader.single('myflie'), (req, res)=>{
    res.send('Ruta raíz')
})

export default router
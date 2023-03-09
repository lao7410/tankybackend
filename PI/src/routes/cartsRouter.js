import { Router } from "express"
import { CartManagerMongo } from "../daos/classes/MongoDb/CartManager.js"

const router = Router()

const cartManagerMongo = new CartManagerMongo

router.post('/', async (req, res) => {
    await cartManagerMongo.createCart()

    res.send({mensaje: "carrito creado"})
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params              // se recibe cid de los parametros
    const {limit = 1 , page = 1, query} = req.query
    try {
        const cartProducts = await cartManagerMongo.getCartProducts(cid, limit, page)
        
        res.send(cartProducts)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params         // se reciben cid, pid de los parametros

    try {
        await cartManagerMongo.uploadProduct(cid, pid)

        res.send({mensaje: "producto agregado al carrito"})

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params         // se reciben cid, pid de los parametros

    try {
        await cartManagerMongo.deleteProduct(cid, pid)

        res.send({mensaje: "producto eliminado del carrito"})

    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params         // se reciben cid, pid de los parametros

    try {
        await cartManagerMongo.uploadProduct(cid, pid)

        res.send({mensaje: "producto agregado al carrito"})

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid', async (req, res) => {
    const { cid, pid } = req.params         // se reciben cid, pid de los parametros

    try {
        await cartManagerMongo.deleteCartProducts(cid)

        res.send({mensaje: "todos los productos eliminados del carrito"})

    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid', async (req, res) => {
    const { cid } = req.params         // se reciben cid, pid de los parametros
    const data = req.body

    try {
        await cartManagerMongo.arrayProductsUpdate(cid, data)

        res.send({mensaje: "Array de productos agregado al carrito"})

    } catch (error) {
        console.log(error)
    }
})

export default router
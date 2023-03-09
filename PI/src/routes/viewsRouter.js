import { Router } from "express";
import { ProductManager } from "../daos/classes/sysFile/productsManagerMongo.js"
import { ProductManagerMongo } from "../daos/classes/MongoDb/ProductManager.js"
import { CartManagerMongo } from "../daos/classes/MongoDb/CartManager.js"

const productManagerMongo = new ProductManagerMongo
const cartManagerMongo = new CartManagerMongo

const router = Router()

const productManager = new ProductManager

router.get('/products', async (req, res)=>{
    const {limit = 1 , page = 1, query} = req.query
    let filtro = {}
    query? filtro = {category: query} : filtro = {}
    try {
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await productManagerMongo.getProducts(limit, page, filtro)
        
        let datos = {
            productos: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            limit,
            query
        }
        res.render('home', datos)
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res)=>{
    const {cid} = req.params
    const {limit = 1 , page = 1} = req.query
    console.log(limit)
    try {
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await cartManagerMongo.getCartProducts(cid, limit, page)
        let data = docs[0].products
        let datos = {
            productos: data,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            limit
        }
        res.render('carts', datos)
    } catch (error) {
        console.log(error)
    }
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

router.get('/chat', (req, res)=>{
    res.render('chat')
})

export default router
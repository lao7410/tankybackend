const { Router } = require("express")
const CartManager = require("../class/cartManager")
const cartRouter = Router()
const cartManager = new CartManager("./mockDB/Carritos.json")

cartRouter.post("/", async (req, res) => {
    try {
        const addedCart = await cartManager.addCart()
        res.status(200).json({ uploaded: addedCart })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res)=>{     //visto con fede AGREGAR LOS ASYNC                          //revisar json qu no suba todo el procuct
    const {cid, pid} = req.params
    try{
        const newCart = await cartManager.addProductsToCart(Number(cid), Number(pid)) 
        return res.status(200).send(newCart)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params
    try{
        const productos = await cartManager.getCartsProducts(Number(cid))
        res.status(200).send({productos})
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

module.exports = cartRouter
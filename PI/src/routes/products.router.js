const { Router } = require('express')
const ProductModel = require('../models/products.model.js')


const router = Router()
router.get('/', async (req, res) => {
    const products = await ProductModel.find({})

    res.json(products)
})
router.post('/', async (req, res) =>{
    const { title, price } = req.body
    const products = await ProductModel.create({
        title,
        price
    })

    res.json(products)
})


module.exports = router
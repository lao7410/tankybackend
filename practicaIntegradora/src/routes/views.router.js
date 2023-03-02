const express = require('express');
const { Router } = require("express")

const ProductManager = require('../class/productManager')

const router = Router()

const productManager = new ProductManager()

router.get('/products', async (req, res) => {  //renderizar la vista y mostrar cada item con su descripcion
    try {
        const productos = await productManager.getProducts()
        let datos = {
            productos
        }

        res.render('home', datos)
    } catch (error) {
        console.log(error)
    }

})

//agregar render del index!!! punto en el PROCESO DE TESTING

router.get('/', (req, res) => {
    res.render('index')
})

// aggregar cista de real timePROCESO DE TESTING

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})
module.exports = router
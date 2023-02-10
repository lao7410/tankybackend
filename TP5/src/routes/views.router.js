const express =require('express');
const { Router } = require("express")

const ProductManager = require('../class/productManager')

const router = Router()

const productManager = new ProductManager()

router.get('/products', async (req, res)=>{
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
router.get('/',(req, res)=>{
    res.render('index')
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

module.exports =  router
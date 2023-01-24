import express, { query } from 'express'
import { ProductManager } from '../entrega2/entrega'
const app = express()
const PORT = 8080
app.use(express.urlencoded({ extended: true }))


//Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
//El servidor debe contar con los siguientes endpoints:
//ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. 
//Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
//Si no se recibe query de límite, se devolverán todos los productos
//Si se recibe un límite, sólo devolver el número de productos solicitados
//ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 


const pManager = new ProductManager

app.get('/products', async (req, res) => {
    try {
        const products = await pManager.getProducts()
        res.send(products)
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get('/products/:pid', async (req, res) => {
    try {
        const product = await pManager.getProduct
        
                      
        res.send(product)

    }
    catch (error) {
        res.status(error).send(error)
    }
})
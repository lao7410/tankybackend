import express from 'express'
import { ProductManager } from './productManager.js'
const app = express()
const PORT = 8080
const productManager = new ProductManager

app.get("/products", async (req, res) => {
    const { limit } = req.query
    const listadoProducts = await productManager.consultarProducto()
    try {
        limit ? res.send(listadoProducts.filter(product => product.id <= limit)) : res.send(listadoProducts)
    } catch (err) {
        console.error(err)
    }
    finally {
        console.log('productos cargados')
    }
})

app.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const listadoProducts = await productManager.consultarProducto()
    const prodID = listadoProducts.find(product => product.id == pid)
    if (!prodID) {
        return res.send('prod no existe')
    } try {
        pid ? res.send(listadoProducts.find(product => product.id == pid)) : res.send(listadoProducts)


    } catch (error) {
        console.log('error')
    } finally {
        console.log('Producto encontrado')
    }
})


app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Escuchando el puerto ${PORT}`)
})
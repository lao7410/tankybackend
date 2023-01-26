import express from 'express'

import { ProductManager } from './productManager.js'

const app = express()
const PORT = 8080

const productManager = new ProductManager


app.get("/products", async (req, res) => {
    //Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo
    const { limit } = req.query
    const listadoProducts = await productManager.consultarProducto()
    try {
        let productosConLimit = limit ? res.send( listadoProducts.filter( product => product.id <= limit )) : res.send(listadoProducts)
    } catch (err) {
        console.error(err)
    }
    finally {
        console.log('productos cargados')
    }



})




/*   const data = await productManager.consultarProducto()
  res.send(data)
  console.log(data) */



app.get('/products/:id', (req, res) => {
    const id = req.query
    res.send(productManager.consultarProducto(id))

})

app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Escuchando el puerto ${PORT}`)
})
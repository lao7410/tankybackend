import express from 'express'

import { ProductManager } from './productManager.js'

const app = express()
const PORT = 8080

const productManager = new ProductManager

//ruta ‘/products’, la cual debe leer el archivo de productos y 
//devolverlos dentro de un objeto. Agregar el soporte para recibir por query 
//param el valor ?limit= el cual recibirá un límite de resultados.

app.get("/products", async (req, res) => {
    const { limit } = req.query
    const listadoProducts = await productManager.consultarProducto()

    
    res.send(listadoProducts)


    
    
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

const express = require('express')
const productRouter = require("./router/productRouter")
const cartRouter = require("./router/cartsRouters")

const app = express()
const PORT = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/products", productRouter)  // OK
app.use("/api/carts", cartRouter) // OK

app.listen(PORT, () => {
    console.log("lISTENING puerto 8080")
})
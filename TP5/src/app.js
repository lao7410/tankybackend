const express = require('express')
const cookieParser = require('cookie-parser')
const usersRouter = require('./routes/users.router.js')
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartsRouters")
const viewsRouter = require('./routes/views.router.js')
const ProductManager = require('./class/productManager')

const handlebars = require('express-handlebars')
const { uploader } = require('./utils/multerConfig.js')

const { Server } = require('socket.io')// saco server para crear socket.io

const app = express()
const PORT = 8080




const productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const httpServer = app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Escuchando puerto: ', PORT);
})

httpServer.on

const socketServer = new Server(httpServer)
console.log('probando')
let productos
console.log('Nuevo cliente conectado')

socketServer.on('connection', async socket => {
    try {
        productos = await productManager.getProducts()
        socket.emit('mensajeServer', productos)
    } catch (error) {
        console.log(error)
    }

    socket.on('product', async data => {

        const {
            title,
            description,
            code,
            price,
            stock,
            category,
            
        } = data
        data.status = true
        console.log('data: ', data)
        console.log('denrtro del product soclet on')

        if (!title || !description || !code || !price || !stock || !category) {
            console.log('Debe completar todos los campos');
        } else {
            try {
                await productManager.addProduct(data)
                let datos = await productManager.getProducts()
                socketServer.emit('productoAgregado', datos)
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('deleteProduct', async data => {
        try {
            await productManager.deleteProduct(data)
            let datos = await productManager.getProducts()
            socketServer.emit('productoEliminado', datos)
        } catch (error) {
            console.log(error)
        }
    })
})

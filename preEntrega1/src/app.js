const express = require('express')
const cookieParser = require('cookie-parser')
const usersRouter = require('./routes/users.router.js')
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartsRouters")
const viewsRouter = require('./routes/views.router.js')

const handlebars = require('express-handlebars')
const { uploader } = require('./utils/multerConfig.js')

const { Server } = require('socket.io')// saco server para crear socket.io

const app = express()
const PORT = 8080



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/virtual', express.static(__dirname + '/public'))
app.use(cookieParser())

//IMPLEMENTATION DE SOCKET SEGUN DIAPO
//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)// me lleva a roites viewsroter


app.use("/api/products", productRouter)//PUESTO ACA PARA QUE INICIE
app.use("/api/carts", cartRouter)//PUESTO ACA PARA QUE INICIE
app.use('/api/usuarios', usersRouter)



//Declarando el httpserver y ponerlo a escuar con el condicional
const httpServer = app.listen(PORT, error => {
    if (error) console.log(error)
    console.log("ECUCHANDO EL PUERTO")
})

/* const httpServer = require('http').createServer(app).listen(PORT, (errorDeescucha) => {
    if (errorDeescucha) console.log("error de escucha en const=hhtoServer")
    console.log("Escuchando el puerto, a ver si funciona") //hasta aca se escucha 18:47
}) */

const io = new Server(httpServer) //decalaro el socket sertver

const mensaje = []

console.log("xq no andara????")
io.on('connection', socket => {
    console.log('Nuevo Cliente conectado')
    socket.on('message', data => {
        console.log(data)
    })
    socket.emit('mensajeServer', 'Listo escuchandote')
    socket.broadcast.emit('evento para todos menos el actual', 'algun tipo de mensaje')
    io.emit('evento para todos', 'algun msj')
    socket.on('disconnect', () => {
        console.log('DESCONECTADO')
    })
})

console.log("salta lo del medio")



app.get('/index', (req, res) => {
    res.render('index', {});
});


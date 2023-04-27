const configObject = require("./config/config.js");
const { httpServer } = require("./server.js");


const PORT = configObject.PORT

httpServer.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${httpServer.address().port }`)
})



//ORDENAMOS PARA QUE LOS ARCHIVOS QUEDEN IGUAL QUE EN CLASE Y SEA MAS FACIL SEGUIR
/* const express = require('express')
const cookieParser = require('cookie-parser')

const session = require('express-session') 

const usersRouter = require('./routes/users.router.js')
const productsRouter = require('./routes/productos.router.js')
const viewsRouter = require('./routes/views.router.js')
const authRouter = require('./routes/auth.router.js')
// const { uploader } = require('./utils.js')
// handlebars_______________________________________________________________
const handlebars = require('express-handlebars')
const { uploader } = require('./utils/multerConfig.js')
// socket io _______________________________________________________________
const { Server } = require('socket.io')
const { objectConfig } = require('./config/config.js')
// socket io _______________________________________________________________
require('dotenv').config()

const passport = require('passport')

const app = express()

const PORT = 8080 || process.env.PORT 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(session(objectConfig.session))

app.use(passport.initialize())

app.use('/virtual' ,express.static(__dirname+'/public'))
app.use(cookieParser())

// handlebars_______________________________________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// handlebars_______________________________________________________________

objectConfig.dbConnection()

app.use('/', viewsRouter)

// http://localhost:8080/api/usuarios
app.use('/auth', authRouter)
app.use('/api/usuarios',  usersRouter)

// http://localhost:8080/api/productos
app.use('/api/productos', productsRouter)

app.post('/single', uploader.single('myfile') ,(req, res)=>{
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${httpServer.address().port }`)
})

// instanciando socket
const io = new Server(httpServer)


const mensajes = [
    // {user: 'Fede', message: 'Hola como están'}
]
let connectedClients = []

io.on('connection', socket => {
    // console.log('Nuevo cliente conectado')
    connectedClients.push(socket)
    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

    socket.on('message', data => {
        console.log('message',data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)
        // persisti 
    })

    socket.on('authenticated', data => {
        
        socket.broadcast.emit('newUserConnected', data)
    })
    
    socket.on('disconnect',()=>{
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })
})
 */
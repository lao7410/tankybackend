const { Router } = require('express')
const authRouter  = require('./auth.router.js')
const usersRouter  = require('./users.router.js')
const productsRouter  = require('./productos.router.js')
const cartsRouter  = require('./cart.router.js')
const parametrosRouter  = require('./parametros.router.js')
const forkRouter  = require('./fork.router.js')
const { uploader } = require('../utils/multerConfig.js')
// nuevo 
const { UserRouter } = require('./UserRouter.js')

const router = Router()

router.use('/api/auth', authRouter)

// http://localhost:8080/api/usuarios
router.use('/api/usuarios', usersRouter)

router.use('/api/carrito', cartsRouter)

router.use('/fork', forkRouter)


const userRouter = new UserRouter()
// http://localhost:8080/api/users  Ejemplo de rutas con clases
router.use('/users', userRouter.getRouter())

// http://localhost:8080/api/productos
router.use('/api/productos', productsRouter)

// http://localhost:8080/api/param
router.use('/api/parametros', parametrosRouter)


router.post('/single', uploader.single('myfile') ,(req, res)=>{
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
})



module.exports = {
    router
}

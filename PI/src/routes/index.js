const { Router } = require('express')
const productsRouter = require('./products.router.js')
const router = Router()

router.get('/', (req,res) => {
    res.send('Ruta raiz')
})

router.use('/api/products', productsRouter)
//router.use('/api/carts', cartssRouter)
//router.use('/api/users', usersRouter)


module.exports = router
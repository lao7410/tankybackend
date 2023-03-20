import { Router } from 'express';
import productRouter from './productos.router.js'


const router = Router ()

router.get('/', (req, res) => {
    res.send('Ruta raiz')
})

//Rutas
router.use('/api/products',productRouter())
// router.use('api/carts',cartRouter)
// router.use('api/users',usersRouter)



export default router
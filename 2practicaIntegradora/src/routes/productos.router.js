const { Router } = require('express')

const router = Router()


// GET api/productos /
router.get('/', (request, response) =>{
    
    response.status(200).send('Productos')
})

// GET api/productos /
router.post('/', (request, response) =>{
    const {name, price} = request.body
    response.status(200).send({name, price})
})

module.exports = router
// export default router


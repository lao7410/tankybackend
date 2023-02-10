const { Router } = require('express')

const router = Router()

const fakeApi = [
    {name: 'Producto 0',  price: 400},
    {name: 'Producto 1',  price: 350},
    {name: 'Producto 2',  price: 300},
    {name: 'Producto 3',  price: 200},
    {name: 'Producto 4',  price: 150}
]

router.get('/', (req, res)=>{    
    let testUser = {
        name: 'Estani   ',
        last_name: 'Rey',
        role: 'user',
    }
    
    res.render('index', {
        user: testUser,
        isAdmin: testUser.role==='admin',
        fakeApi,
        style: 'index.css'
    })
})

router.get('/register', (req, res)=>{
    res.render('register')
})

module.exports = router
// export default router

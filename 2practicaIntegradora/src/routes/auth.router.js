const {Router} = require('express')
const { UserModel } = require('../models/userSchema')
const { generateToken } = require('../utils/tokens')

const router = Router()


router.get('/login', (req,res) => {
    res.render('login')
})
router.post('/login', async (req,res) => {
    const {email, password} = req.body

    const user = await UserModel.findOne({email})
    if(!user) return res.status(401).send({status: 'error', error: 'No existe el usuario'})
    const token = generateToken(user)
    res.cookie('coderCookieToken', token, {
        maxAge: 60*60*1000,
        httpOnly: true
    }).send({message: 'logged in'})

})

module.exports =  router


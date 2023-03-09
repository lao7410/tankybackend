const { Router } = require('express')

const router = Router()

router.get('/set', (req, res) => {
    res.cookie('Coderhouse', 'Esto es una cookie', { maxAge: 30000000 }.send('cookie seteada'))
})

router.get('/get', (req, res) => {
    res.send(req.cookies)
})
router.get('/setSigned', (req, res) => {
    res.cookie('Coderhouse', 'Esto es una cookie', { maxAge: 30000000, signed: true }.send('cookie firmada'))
})
router.get('/get', (req, res) => {
    res.send(req.cookies)
})

router.get('/delete', (req, res) => {
    res.clearCookie('Coderhouse').send('cookie borrada')
})
module.exports = router
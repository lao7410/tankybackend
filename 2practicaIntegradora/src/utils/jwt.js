const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'CoderKeyQueFuncionaComoUnSecret'

// crear la funcion que genera el token llamada generateToken
const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if (!authHeader) return res.status(401).send({status: 'error',error: 'Not authenticated'})

    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if (err) return res.status(403).send({status: 'error',error: 'Not authenticated'})

        req.user = credentials.user
        
        next()
    })
}

module.exports = {
    generateToken,
    authToken,
    PRIVATE_KEY
}

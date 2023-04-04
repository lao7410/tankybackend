const jwt = require('jsonwebtoken')

require('dotenv').config()
const PRIVATE_KEY = process.env.PRIVATE_KEY


const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ status: 'error', error: 'Not authenticated' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: 'error', error: 'Not authorized' })
        }

        // Establece la cookie de token en la sesión del usuario
        res.cookie('token', token)

        // Almacena la información del usuario en la solicitud
        req.user = decoded.user

        next()
    })
}

module.exports = { generateToken, authToken }

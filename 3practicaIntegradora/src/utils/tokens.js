const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'coderSecret'

const generateToken = (user) => {
    return  jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'})
}

// const authToken = (req, res, next) => {
    
// }

module.exports = {
    generateToken
}

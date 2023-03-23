const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'coderSecret'


const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) => {
    // const authHeader = req.headers.authorization
    const authHeader = req.headers['authorization']

    if(!authHeader){
        return res.status(401).json({status:'error',error: 'Not autenticated'})
    }
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5vbWJyZSI6IkZlZGVyaWNvIn0sImlhdCI6MTY3OTAwOTczMiwiZXhwIjoxNjc5MDk2MTMyfQ.4cbHvfJNOwgczrzeKYQD24iedhFW0QMjhIH_fCGfCg4
    // ['Bearer', 'token']
    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, credential)=>{
        if(error){
            return res.status(403).json({status:'error',error: 'Not authorized'})
        }
        req.user = credential.user
        next()
    })
}

module.exports = {
    PRIVATE_KEY,
    generateToken,
    authToken
}

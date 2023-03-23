const passport = require('passport')
const { Strategy, ExtractJwt } = require("passport-jwt")

const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['coderCookieToken']
    }
    return token
}

const objectConfigPassport = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'coderSecret'
}

const initializePassport = ()=> {
    passport.use('jwt', new JWTStrategy(objectConfigPassport, async (jwt_payload, done)=>{
        try {
            // validdaciones o traer el usuario de bd
            // if(!user) return done(null, false, {messages: 'No user found'})
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    })) 
}

module.exports = {
    initializePassport
}

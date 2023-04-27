const passport = require("passport");
const {Strategy, ExtractJwt} = require('passport-jwt')

const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt

let cookieExtractor = ( req )=>{
    let token = null
    if(req && req.cookies){
        token = req.cookies('coderCookieToken')
    }
    return token
}


const initializePassport = () =>{
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}


module.exports = {
    initializePassport
}


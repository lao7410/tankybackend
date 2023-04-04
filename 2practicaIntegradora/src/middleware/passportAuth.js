const passport = require("passport");


const passportAuth = strategy =>{
    return async (req, res, next) =>{
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user) return res.status(401).send({status: 'error', error: info.message ? info.message : info.toString()})
            req.user = user
            console.log('Token generado:', req.user.token)
            next()
        })(req, res, next)
    }
}   

module.exports ={
    passportAuth

}

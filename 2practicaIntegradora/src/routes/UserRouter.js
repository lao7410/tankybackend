const Router = require('./router.js')
const jwt = require('jsonwebtoken')

class UserRouter extends Router {
    // constructor de la clase routerClass
    init(){
        this.get('/', ["PUBLIC"], (req, res) =>{
            // solo me limito a enviar el payload
            res.sendSuccess('Hola UserRouter')
        })

        this.get('/currentUser', ["USER", "USER_PREMIUN"], (req,res)=>{
            res.sendSuccess(req.user)
        })

        this.post('/login', ["PUBLIC"], (req, res) => {
            // usuario hardcordeado, lo que nos importa 
            // aquí es la asignación del role.
            let user = {
                email: req.body.email,
                role: 'user'
            }
            console.log(user)
            
            let token = jwt.sign(user, 'CoderSecretClassRouter')
            res.sendSuccess({token})
        })
    }
}



module.exports = {
    UserRouter
}

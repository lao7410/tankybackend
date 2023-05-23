const { UserModel } = require("../Dao/mongo/models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptPass")



const registerUser = async (req, res)=>{ // con basae de datos
    const { first_name, last_name, email, password } = req.body

    const exists = await UserModel.findOne({email})

    if (exists) return res.status(401).send({status: 'error', message: 'El usuario ya existe'})
    const hashedPassword = createHash(password)


    const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    }
    let result = await UserModel.create(user)
    

    res.status(200).json({
        status: 'success',
        message: 'Usuario creado correctamente',
        payload: result
    })
}

const loginUser =  async (req, res)=>{
    const { email, password} = req.body    
    console.log(email, password)
   
    const user = await UserModel.findOne({email})

    console.log(user)
    if (!user) return res.status(401).send({status: 'error', error: 'Usuario o contraseña incorrectos'})
    
    const isValidPass = isValidPassword(user, password)

    if (!isValidPass) return res.status(401).send({status: 'error', error: 'Usuario o contraseña incorrectos'})

    console.log('logged in!')

    res.send({status:'success', message: 'Usuario logueado correctamente'})
}


module.exports = {
    loginUser,
    registerUser
}

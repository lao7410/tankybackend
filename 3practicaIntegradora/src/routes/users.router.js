const { Router, response } = require('express')
const passport = require('passport')
const { passportCall } = require('../utils/passportCall')
const { authorization } = require('../middleware/authorization.middleware')
const { 
    getUsers, 
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller.js')

const router = Router()

router
    // .get('/', passportCall('jwt'), authorization('admin'),async (req, res) =>{
    .get('/', getUsers)
    .get('/:id', getUser)
    .post('/', createUser)
    .put('/:uid', updateUser)
    .delete('/:uid', deleteUser)

module.exports = router





/* const Router = require('./router.js')
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


class ProductRouter{
    
}

module.exports = {
    UserRouter
}
 */

/* const { Router } = require('express');
const { authorization } = require('../middleware/authorizationPassport');
const { passportAuth } = require('../middleware/passportAuth');
const { UserModel } = require('../models/userSchema');

const router = Router();

// GET http://localhost:8080/api/usuarios/
router.get('/', passportAuth('jwt'), authorization('admin'), async (req, res) => {
  const { page = 1 } = req.query;
  const users = await UserModel.paginate({}, { limit: 10, page });
  res.status(200).send(users);
});

// GET http://localhost:8080/api/usuarios/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).send({ message: 'Usuario no encontrado' });
  }
  res.status(200).send(user);
});

// POST http://localhost:8080/api/usuarios/
router.post('/', async (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body;
  const user = new UserModel({ nombre, apellido, email, password, rol });
  await user.save();
  res.status(201).send({ message: 'Usuario creado exitosamente', user });
});

// PUT http://localhost:8080/api/usuarios/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, password, rol } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { nombre, apellido, email, password, rol },
    { new: true }
  );
  if (!user) {
    return res.status(404).send({ message: 'Usuario no encontrado' });
  }
  res.status(200).send({ message: 'Usuario actualizado exitosamente', user });
});

// DELETE http://localhost:8080/api/usuarios/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).send({ message: 'Usuario no encontrado' });
  }
  res.status(200).send({ message: 'Usuario eliminado exitosamente', user });
});

module.exports = router;
 */
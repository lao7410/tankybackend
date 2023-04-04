const { Router } = require('express');
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

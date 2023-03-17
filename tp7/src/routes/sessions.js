const { Router } = require("express");
const UserModel = require("../models/userModel");
const autentication = require("../middleware/authentication");
const isLogged = require('../middleware/logg')

const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res) => {
  const administrator = {email: "flavio@admin", password: "admin"}
  const { mail, pass } = req.body;
  const user = await UserModel.findOne({ email: mail, password: pass });
  
  if (user) {
    const admin = user.email === administrator.email && user.password === administrator.password
    req.session.user = {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      role: admin? "admin" : "user"
    };
    res.redirect("/products");
  } else {
    return res.render("sessionAlert", {success: false, message: "Credenciales incorrectas", case: "Login", url:"/login"});
  }
});

sessionsRouter.post("/register", isLogged, async (req, res) => {
  const { nombre, apellido, usuario, pass, email } = req.body;
  if (!nombre || !apellido || !usuario || !pass || !email) {
    return res.render("sessionAlert", {success: false, message: "Completar todos los campos", case: "Registro", url:"/register"});
  }
  //validar si existe el usuario
  try {
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.render("sessionAlert", {success: false, message: "Email ya registrado", case: "Registro", url:"/register"});
    } else {
      //forma alternativa de crear el usuario al método create
      const user = new UserModel({ nombre, apellido, email, password: pass });
      await user.save();
      res.render("sessionAlert", {success: true, message: `${user.nombre} ${user.apellido} te has registrado exitosamente`, url:"/login"})
    }
  } catch (err) {
    console.log(err);
  }
});

sessionsRouter.get("/logout", (req, res) => {
  req.session.destroy((err) =>
    !err ? res.redirect("/login") : res.send({ status: "Error", err })
  );
});

module.exports = sessionsRouter;

const { Router } = require("express");
// UserModel
const { generateToken } = require("../utils/jwt");
const { UserModel } = require("../Dao/mongo/models/user.model");

const router = Router();

const products = [
  {
    title: "Gorra rosa",
    price: 400,
    imageUrl:
      "https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg",
    category: "gorras",
  },
  {
    title: "Gorra rosa",
    price: 350,
    imageUrl:
      "https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg",
    category: "gorras",
  },
  {
    title: "Gorra rosa",
    price: 300,
    imageUrl:
      "https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg",
    category: "gorras",
  },
  {
    title: "Gorra rosa",
    price: 200,
    imageUrl:
      "https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg",
    category: "gorras",
  },
  {
    title: "Gorra rosa",
    price: 150,
    imageUrl:
      "https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg",
    category: "gorras",
  },
];

let users = [{ email: "estani@estani", password: "estani", role: "admin" }];

router.get("/", async (req, res) => {
  let testUser = {
    name: "Estanislao",
    last_name: "Rey",
    role: "admin",
  };
  // req.session.user = testUser.name
  // req.session.admin = true
  res.status(200).render("index", {
    user: testUser,
    isAdmin: testUser.role === "admin",
    products,
    style: "index.css",
  });
});

//_________________________________________________________________________
router.get("/login", async (req, res) => {
  res.status(200).render("login");
});

//_________________________________________________________________________

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // encripar la contraseña que viene del formulario, comparar con la encriptada de la base de datos
  // const user = await UserModel.findOne({email, password})
  const user = await users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user)
    return res
      .status(401)
      .send({ status: "error", error: "Usuario o contraseña incorrectos" });

  // req.session.user = {
  //     name: `${user.first_name} ${user.last_name}`,
  //     email: user.email
  // }

  const { password: pass, ...rest } = user;
  const token = generateToken(rest);

  // res.status(200).send({
  //     status: 'success',
  //     token,
  //     message: 'Login correcto',
  // })

  res
    .cookie("coderCookieToken", token, {
      maxAge: 60 * 60 * 1000,
    })
    .json({ message: "logged in!" });
});

router.get("/register", async (req, res) => {
  res.status(200).render("register");
});

router.post("/register", async (req, res) => {
  // con basae de datos
  const { first_name, last_name, email, password } = req.body;

  // pregintar si existe el usuario
  // const exists = await user.findOne({email})
  const exists = await users.find((user) => user.email === email);

  if (exists)
    return res
      .status(401)
      .send({ status: "error", message: "El usuario ya existe" });

  const user = {
    first_name,
    last_name,
    email,
    password, // lo vamos a ver la clase que viene
  };
  // let result = await UserModel.create(user)
  users.push(user);
  const accsess_token = generateToken(user);

  res.status(200).json({
    status: "success",
    message: "Usuario creado correctamente",
    accsess_token,
  });
});

router.get("/logout", async (req, res) => {
  // session.destroy()
  req.session.destroy((err) => {
    if (err) return res.send({ status: "Logout error", message: err });
  });
  res.status(200).redirect("/api/auth/login");
});

module.exports = router;

// POR LAS DUDAS SE GUARDA------------------
/* const {Router} = require('express')
const { UserModel } = require('../models/userSchema')
const { generateToken } = require('../utils/tokens')

const router = Router()


router.get('/login', (req,res) => {
    res.render('login')
})
router.post('/login', async (req,res) => {
    const {email, password} = req.body

    const user = await UserModel.findOne({email})
    if(!user) return res.status(401).send({status: 'error', error: 'No existe el usuario'})
    const token = generateToken(user)
    res.cookie('coderCookieToken', token, {
        maxAge: 60*60*1000,
        httpOnly: true
    }).send({message: 'logged in'})

})

module.exports =  router

 */

const { Router } = require("express");
const UserModel = require("../models/userModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = passport.authenticate("jwt", { session: false });

const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    const isAdmin =
      user.email === adminEmail &&
      (await bcrypt.compare(password, adminPassword));
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("jwt", token);
      req.session.user = {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: isAdmin ? "admin" : "user",
      };
      return res.redirect("/products/" + user.email);
    } else {
      return res.render("sessionAlert", {
        success: false,
        message: "Credenciales incorrectas",
        case: "Login",
        url: "/login",
      });
    }
  } else {
    return res.render("sessionAlert", {
      success: false,
      message: "Credenciales incorrectas",
      case: "Login",
      url: "/login",
    });
  }
});

sessionsRouter.post("/register", async (req, res) => {
  console.log("Register route called!"); // Agregar esto
  const { nombre, apellido, usuario, password, email } = req.body;
  if (!nombre || !apellido || !usuario || !password || !email) {
    return res.render("sessionAlert", {
      success: false,
      message: "Completar todos los campos",
      case: "Registro",
      url: "/register",
    });
  }
  try {
    const userExists = await UserModel.exists({ email });
    if (userExists) {
      return res.render("sessionAlert", {
        success: false,
        message: "Email ya registrado",
        case: "Registro",
        url: "/register",
      });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new UserModel({
        nombre,
        apellido,
        email,
        password: hashedPassword,
      });
      await user.save();
      return res.render("sessionAlert", {
        success: true,
        message: `${user.nombre} ${user.apellido} te has registrado exitosamente`,
        url: "/login",
      });
    }
  } catch (err) {
    console.log(err);
  }
});


sessionsRouter.get("/logout", authentication, (req, res) => {
  req.logout();
  res.clearCookie("jwt");
  delete req.session.user;
  return res.redirect("/");
});

sessionsRouter.get("/current", (req, res) => {
  if (req.session && req.session.user) {
    const user = req.session.user;
    return res.json({ user });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = sessionsRouter;

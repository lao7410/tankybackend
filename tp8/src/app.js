const express = require("express");
require('dotenv').config()
const initConection = require("./dbConnection/mongo");
const router = require("./routes/index");
const handlebars = require("express-handlebars");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MongoStore = new require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const bcrypt = require("bcrypt");
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const User = require("./models/userModel");


const app = express(); // Creamos una instancia de Express
initConection(); // Inicializamos la conexión con la base de datos

// Configuración del middleware
app.use(express.json()); // Interpreta los cuerpos de las solicitudes entrantes en formato JSON
app.use(express.urlencoded({ extended: true })); // Analiza las solicitudes entrantes con cuerpos codificados en URL
app.use(cookieParser()); // Analiza las cookies en las solicitudes entrantes

// Definición de rutas
app.get("/", function(req, res) { // Manejador de ruta para la página principal
  res.redirect("/login"); // Redirige al usuario a la página de inicio de sesión
});

app.get('/realtimeproducts', function(req, res) { // Manejador de ruta para la página de productos en tiempo real
  res.sendFile(path.join(__dirname, 'public', 'realtimeproducts.html')); // Envía el archivo HTML de la página de productos en tiempo real
});

app.get('/auth/github', passport.authenticate('github', { state: true })); // Manejador de ruta para iniciar sesión con GitHub

app.get("/auth/github/callback", // Manejador de ruta para el callback de inicio de sesión con GitHub
passport.authenticate("github", {
    successRedirect: "/productos", // Si el inicio de sesión es exitoso, redirige al usuario a la página de productos
    failureRedirect: "/login", // Si el inicio de sesión falla, redirige al usuario a la página de inicio de sesión
  })
);

// Configuración de la sesión con MongoDB
app.use(
  session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      /* mongoUrl: "mongodb://localhost:27017/comision32270", */
      mongoUrl:"mongodb+srv://tankysoluciones:CoderhouseBackend@cluster0.2zdod6i.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 1500000000,
    }),
  })
);

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Archivos estáticos
app.use("/aleas", express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user)
        return done(null, false, { message: "error usuariio." });

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return done(err);
        if (!result)
          return done(null, false, { message: "mal pass." });
        return done(null, user);
      });
    });
  })
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        if (err) { return done(err); }
        return done(null, user, { redirect: '/productos' });
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use(router);

module.exports = app;

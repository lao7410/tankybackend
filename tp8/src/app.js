const express = require("express");
require('dotenv').config()
const initConection = require("./dbConnection/mongo");
const router = require("./routes/index");
const handlebars = require("express-handlebars");
const session = require("express-session");
const MongoStore = new require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const bcrypt = require("bcrypt");

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const User = require("./models/userModel");


const app = express();
initConection();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.redirect("/login");
});

app.get('/realtimeproducts', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'realtimeproducts.html'));
});


app.use(
  session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/comision32270",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 1500000000,
    }),
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
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
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user);
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

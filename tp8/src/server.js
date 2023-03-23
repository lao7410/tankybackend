const express = require("express");
const initConection = require("./dbConnection/mongo");
const router = require("./routes/index");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();
initConection();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://tankysoluciones:CoderhouseBackend@cluster0.2zdod6i.mongodb.net/ecommerce?retryWrites=true&w=majority",
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

app.use(router);


app.listen(PORT, (err) => {
  if (err) return err;
  console.log(`Escuchando  ${PORT}`);
});


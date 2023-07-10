const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const { initConnection } = require('./config/connectionMongo');
const Product = require("./dao/models/product");

// Configuración de archivos estáticos
app.use(express.static("public"));

// Configuración del servidor de Socket.io
// Configuración del servidor de Socket.io
io.on("connection", async (socket) => {
    console.log("Usuario conectado");
  
    // Configurar body-parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  
    // Establecer conexión con MongoDB
    await initConnection();
  
    // Manejar eventos de Socket.io aquí
    socket.on("createProduct", async (product) => {
      try {
        // Aquí debes guardar el producto en la base de datos
        // y emitir el evento 'productCreated' con el nuevo producto
  
        // Por ejemplo:
        // 1. Guardar el producto en MongoDB utilizando Mongoose
        const newProduct = new Product(product);
        const savedProduct = await newProduct.save();
  
        // 2. Emitir el evento 'productCreated' con el nuevo producto
        io.emit("newProduct", savedProduct);
      } catch (error) {
        console.error(error);
      }
    });
  
    socket.on("productDeleted", (productId) => {
      io.emit("deleteProduct", productId);
    });
  
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });
  
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Rutas y controladores
app.use("/api/products", productRoutes(io));
app.use("/api/carts", cartRoutes);

// Ruta principal
app.get("/", (req, res) => {
  const productsData = fs.readFileSync(
    path.join(__dirname, "data", "products.json"),
    "utf-8"
  );
  const products = JSON.parse(productsData);

  res.render("index", { products });
});

app.get("/realtimeproducts", (req, res) => {
  const productsData = fs.readFileSync(
    path.join(__dirname, "data", "products.json"),
    "utf-8"
  );
  const products = JSON.parse(productsData);

  res.render("layouts/realTimeProducts", { products });
});

// Iniciar el servidor
const port = 8080;
http.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

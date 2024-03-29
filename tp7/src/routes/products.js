const { Router } = require("express");
const ProductManager = require("../daos/mongo/ProductManager");
const { Types } = require("mongoose")

const routerProductos = Router();
const productHandler = new ProductManager();

routerProductos.get("/", async (req, res) => {
  const { limit, page, sort, category, status } = req.query
  try {
    const productsData = await productHandler.getProducts(limit, page, sort, category, status);
    res.send(productsData);
  } catch (err) {
    console.log(err.message)
    res.status(400).send(err);
  }
});

routerProductos.get('*', (req, res) => {
  res.status(404).send('Error 404: Página no encontrada');
});

routerProductos.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productHandler.getProduct(pid);
    res.send(product);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

routerProductos.post("/", async (req, res) => {
  let producto = req.body;
  if (!req.body.status) req.body.status = true;
  try {
    await productHandler.addProduct(producto);
    res.status(200).json({ redirectUrl: "http://localhost:8080/products" });
  } catch (err) {
    if (err.message.startsWith("Ya existe un producto")) {
      res.status(409).json({
        redirectUrl: "http://localhost:8080/alerts",
        message: err.message,
      });
    } else {
      res.status(400).json({
        redirectUrl: "http://localhost:8080/alerts",
        message: err.message,
      });
    }
  }
});

routerProductos.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newProd = req.body;
  if (req.body.status === undefined) req.body.status = true;
  if (Object.keys(newProd).length === 0)
    return res.status(400).send("Actualizar");
  try {
    +(await productHandler.updateProduct(pid, newProd));
    res.status(200).json({ actualizado: "success" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

routerProductos.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const deleted = await productHandler.deleteProduct(pid);
    if (deleted !== 0)
      res
        .status(200)
        .json({ redirectUrl: "http://localhost:8080/realtimeproducts" });
    else
      res
        .status(400)
        .json({
          redirectUrl: "http://localhost:8080/alerts",
          message: "Error al eliminar producto",
        });
  } catch (err) {
    console.log(err.message)
    res
      .status(400)
      .json({
        redirectUrl: "http://localhost:8080/alerts",
        message: "Error al eliminar producto",
      });
  }
});

module.exports = routerProductos;

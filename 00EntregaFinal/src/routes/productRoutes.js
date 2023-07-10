const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

module.exports = (io) => {
  // Ruta: /products
  router.get("/", productController.getProducts);

  // Ruta: /products/:pid
  router.get("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  // Ruta: /products
  router.post("/", (req, res) => {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    const newProduct = {
      id: productManager.generateId(),
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    productManager.addProduct(newProduct);
    io.emit("newProduct", newProduct);

    res.json({ message: "Product created successfully", product: newProduct });
  });

  // Ruta: /products/:pid
  router.put("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;

    productManager.updateProduct(productId, updatedProduct);

    res.json({ message: "Product updated successfully" });
  });

  // Ruta: /products/:pid
  router.delete("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);

    productManager.deleteProduct(productId);
    io.emit("productDeleted", productId);

    res.json({ message: "Product deleted successfully" });
  });

  return router;
};

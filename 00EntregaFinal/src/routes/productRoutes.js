const express = require("express");
const router = express.Router();
const path = require("path");
const ProductManager = require("../utils/ProductManager");

const filePath = path.join(__dirname, "..", "data", "products.json");
const productManager = new ProductManager(filePath);

// Ruta: /products
router.get("/", (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json({ products: limitedProducts });
  } else {
    res.json({ products });
  }
});

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
    id: productManager.generateId(), // Generar un nuevo ID para el producto
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

  res.json({ message: "Product deleted successfully" });
});

module.exports = router;

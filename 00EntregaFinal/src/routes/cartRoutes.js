const express = require("express");
const router = express.Router();
const CartManager = require("../utils/CartManager");
const cartManager = new CartManager();

// Ruta raíz POST /api/carts/
router.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.json(newCart);
});

// Ruta GET /api/carts
router.get("/", (req, res) => {
  const carts = cartManager.getAllCarts();
  res.json(carts);
});

// Ruta GET /api/carts/:cid
router.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCartById(cartId);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    res.status(400).json({ message: "Invalid quantity" });
    return;
  }

  const success = cartManager.addProductToCart(cartId, productId, quantity);

  if (success) {
    res.json({ message: "Product added to cart successfully" });
  } else {
    res.status(404).json({ message: "Cart or product not found" });
  }
});

module.exports = router;

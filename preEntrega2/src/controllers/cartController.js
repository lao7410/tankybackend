import express from "express";
import CartManager from "../dao/classes/MongoDb/CartManager.js";

const cartManager = new CartManager();

const cartController = express.Router();

cartController.post("/", async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).send("Cart crado satisf");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creando cart");
  }
});

cartController.get("/:id", async (req, res) => {
  try {
    const cart = await cartManager.getCart(req.params.id);
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting cart");
  }
});

cartController.post("/:id/products/:pid", async (req, res) => {
  try {
    await cartManager.addProduct(req.params.id, req.params.pid);
    res.status(201).send("Product added to cart successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding product to cart");
  }
});

export default cartController;
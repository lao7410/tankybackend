/* import { Router } from "express"
import ProductManager from "../dao/classes/MongoDb/ProductManager.js"
import CartManager  from "../dao/classes/MongoDb/CartManager.js"
import viewsRouter  from "Router()"
import productHandler  from "new ProductManager()"
import cartHandler  from "new CartManager()"
import autentication  from '../middlewares/authentication.js'
import isLogged  from '../middlewares/logg.js'

viewsRouter.get("/login", isLogged, async (req, res) => {
  res.render("login");
});
viewsRouter.get("/register", isLogged, async (req, res) => {
  res.render("register");
});

viewsRouter.get("/products", autentication, async (req, res) => {
  const {nombre, apellido, role} = req.session.user
  const isAdmin = role === "admin"
  try {
    const {
      payload,
      page,
      totalPages,
      hasNextPage,
      hasPrevPage,
      prevLink,
      nextLink,
    } = await productHandler.getProducts();
    const dataExist = payload.length;
    res.render("editProductos", {
      isAdmin,
      nombre,
      apellido,
      payload,
      dataExist,
      hasNextPage,
      hasPrevPage,
      prevLink,
      nextLink,
      page,
      totalPages,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

viewsRouter.get("/carts", autentication, (req, res) => {
  res.render("homeCarritos");
});

viewsRouter.get("/carts/:cid", autentication, async (req, res) => {
  const { cid } = req.params;
  try {
    const cartProducts = await cartHandler.getProductsfromCart(cid);
    const { payload: catalogProducts } = await productHandler.getProducts();
    const cartExist = cartProducts.length;
    const catalogExists = catalogProducts.length;
    res.render("editCarritos", {
      cartProducts,
      catalogProducts,
      cartExist,
      catalogExists,
      id: cid,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = viewsRouter; */
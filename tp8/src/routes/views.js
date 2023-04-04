const { Router } = require("express");
const ProductManager = require("../daos/mongo/ProductManager");
const CartManager = require("../daos/mongo/CartManager");
const userManager = require("../daos/mongo/UserManager");
const productHandler = new ProductManager();
const viewsRouter = Router();
const isLogged = require('../middleware/logg')
const cartHandler = new CartManager();
const autentication = require('../middleware/authentication')

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

viewsRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    //Aquí deberías validar que los campos enviados son válidos
    const user = await userManager.createUser(first_name, last_name, email, age, password);
    req.session.user = user;
    res.redirect("/products");
  } catch (err) {
    res.send({ error: err.message });
  }
});


module.exports = viewsRouter;
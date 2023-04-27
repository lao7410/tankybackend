const { Router } = require("express");
const { authToken } = require("../utils/jwt");
const {
  getProdutcs,
  createProdutcs,
  getProdutc,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller.js");

const router = Router();

router.get("/", getProdutcs);
router.get("/:id", getProdutc);
router.post("/", authToken, createProdutcs);
router.put("/:id", authToken, authorization("admin"), updateProduct);
router.delete("/:id", authToken, authorization("admin"), deleteProduct);

module.exports = router;

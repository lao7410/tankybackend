const { Router } = require('express')
const routerProductos = require('./products')
const routerCarritos = require('./carts')
const sessionsRouter = require("./sessions");
const routerViews = require('./views')

const router = Router()
router.use("/sessions", sessionsRouter);
router.use("/api/products", routerProductos)
router.use("/api/carts", routerCarritos)
router.use("/", routerViews)
router.use("/alerts/:message", (req, res) => {
    const { message } = req.params
    res.render('alert', { message })
})
router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
  });

module.exports = router
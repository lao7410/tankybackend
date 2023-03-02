const { Router } = require("express")
const ProductManager = require("../class/productManager")
const productsRouter = Router()
const productManager = new ProductManager("./mockDB/Productos.json")



productsRouter.get("/", async (req, res) => { //traigo a la func de la clase pasada,
    console.log('probando /')
    const { limit } = req.query
    const productos = await productManager.getProducts()
    if (!limit) return res.send({ productos })
    res.json({ status: "success", payload: productos.slice(0, limit) })         //OJO RECORDA ESTO Array.prototype.slice()
    //El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
})

productsRouter.get("/:pid", async (req, res) => {   
    console.log('probando /:pid)')                           //Con fede ya visto
    const { pid } = req.params
    const productos = await productManager.getProducts()
    const filtrado = productos.find(prd => prd.id === Number(pid))
    return filtrado ? res.send({ status: "success", payload: filtrado }) : res.json({ Error: "No se encontró producto" })
})

productsRouter.post('/', async (req, res) => {
    const newItem = req.body
    newItem.status = true

    if (!newItem.title || !newItem.description || !newItem.price || !newItem.thumbnail || !newItem.code || !newItem.stock || !newItem.category) {
        return res.send({ mensaje: 'Debe completar todos los campos' })
    }
    let productDb = await productManager.getProducts()
    const data = await productDb.find(product => product.code === newItem.code)

    if (data) {
        res.send({ mensaje: 'El código de producto ya existe' })
    } else {
        try {
            await productManager.addProduct(newItem)
            res.send({ mensaje: 'Producto agregado' })
        } catch (error) {
            console.log(error);
        }
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const newItem = req.body

    if (!newItem.title || !newItem.description || !newItem.price || !newItem.thumbnail || !newItem.code || !newItem.stock || !newItem.category) {
        res.send({ alerta: 'No puede dejar campos sin completar' })
    } else {
        const prod = newItem
        try {
            await productManager.updateProduct(pid, prod)
            res.send({ mensaje: 'Producto actualizado' })
        } catch (error) {
            console.log(error);
        }
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params

    try {
        await productManager.deleteProduct(pid)
        res.send({ mensaje: 'Producto eliminado' })
    } catch (error) {
        console.log(error);
    }
})

module.exports = productsRouter
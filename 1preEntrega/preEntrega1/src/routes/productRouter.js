const { Router } = require("express")
const ProductManager = require("../class/productManager")
const productsRouter = Router()
const productManager = new ProductManager("./mockDB/Productos.json")



productsRouter.get("/", async (req, res) => { //traigo a la func de la clase pasada,
    const { limit } = req.query
    const productos = await productManager.getProducts()
    if (!limit) return res.send({ productos })
    res.json({ status: "success", payload: productos.slice(0, limit) })         //OJO RECORDA ESTO Array.prototype.slice()
                                                                                //El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
})                                                                              //arr.slice([inicio [, fin]])    

productsRouter.get("/:pid", async (req, res) => {                              //Con fede ya visto
    const { pid } = req.params
    const productos = await productManager.getProducts()
    const filtrado = productos.find(prd => prd.id === Number(pid))
    return filtrado ? res.send({ status: "success", payload: filtrado }) : res.json({ Error: "No se encontró producto" })
})
productsRouter.post("/", async (req, res) => {                                 //Preguntar a Lu si esta bien validado. Fede dijo q no validar en classes---- 
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send("Faltan Datos, agregar correctamente!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    try {
        const addedProduct = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails)  ///cambiar a ingles correc LU---OK
        res.status(200).json({ agregado: addedProduct })
    }
    catch (err) {
        res.status(400).send(err.message)
    }

})

productsRouter.put("/:pid", async (req, res) => { //FUNCIONA CARAJ!!!!!!!!!!!!!!!!!
    const { pid } = req.params
    const newProduct = req.body
    if (Object.keys(newProduct).length === 0) return res.status(400).send("Updated product")
    try {
        const updated = await productManager.updateProduct(pid, newProduct)
        res.status(200).json({ actualizado: updated })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

productsRouter.delete("/:pid", async (req, res) => {  // OK //MODIFICAR NOM ANTES DE SUBIR
    const { pid } = req.params
    try {
        const deleteProd = await productManager.deleteProduct(pid)
        res.status(200).json({ eliminado: deleteProd })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
)

module.exports = productsRouter
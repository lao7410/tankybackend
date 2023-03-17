import ProductManager from '../dao/classes/MongoDB/ProductManager.js';
import { Router } from 'express'

const router = Router()
const productManager = new ProductManager();

router.get('/products', async function(req, res, next) {
    try {
      const products = await productManager.getProducts();
      const response = { info: products };
      res.send(response);
    } catch (err) {
      next(err);
    }
  })

const queryImport = async (limit) => {
    const array = []
    if (limit === undefined) {
        console.log('products');
        return await productManager.getProducts()
    }
    else {
        for (let index = 1; index <= limit; index++) {
            array.push(await productManager.getProductById(index))
        }
        return array
    }
}

router.get("/", async (req, res) => {
    res.send({ message: "esto es prod" });
});


router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    let info = await productManager.getProductById(parseInt(pid))
    res.send(info)
})

router.post('/', async (req, res) => {
    let product = req.body
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        return res.status(400).send({ message: 'Completar los datos faltantes' })
    }
    productManager.addProducts(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category)
    res.status(201).send({
        product,
        message: 'usuario creado'
    })

})

router.put('/products', function(req, res) {
    const products = req.body.products;
    const promises = [];
  
    for (let productId in products) {
      promises.push(productManager.updateProduct(productId, products[productId]));
    }
  
    Promise.all(promises)
      .then(() => res.send({ message: "Products updated successfully." }))
      .catch(() => res.status(500).send({ message: "Error updating products." }));
  });

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    productManager.deleteProduct(parseInt(pid))
    res.status(201).send({
        message: 'Producto Eliminado'
    })
})

export default router
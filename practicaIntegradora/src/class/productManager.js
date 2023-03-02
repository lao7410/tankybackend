const fs = require('fs')

class ProductManager {
    #ruta = './Productos.json'
    constructor(path) {
        /* this.productos = [] */
        this.path = this.#ruta //ahora escribe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    addProduct = async (newItem) => {
        let productDb = await this.getProducts()
        try {
            if (productDb.length === 0) {
                newItem.id = 1
                productDb.push(newItem)
            } else {
                if (productDb.some((productDb => productDb.code === newItem.code))) {
                    throw new Error("CODIG DUPLICADO - INSERTE OTRO PRODUCTO")         // preg a Lu---------[Tutora] Luisina González 19:22    throw new error y tenes q pasarle el ({ msg: "error"})
                }
                productDb = [...productDb, { ...newItem, id: productDb[productDb.length - 1].id + 1 }]
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productDb, null, '\t'))
            console.log('CARGA EXITOSA');
        } catch (error) {
            console.log(error);
        }
    }
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const productDb = JSON.parse(data);
                return productDb;
            }
            await fs.promises.writeFile(this.path, '[]', 'utf-8')
            return []
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        const data = await this.getProducts()
        const find = data.find(prod => prod.id === id)
        const idx = data.findIndex(prod => prod.id === id)
        if (find) return { find, idx }
        else throw new Error("No existe el producto")
    }

    updateProduct = async (id, prod) => { //funiona
        const keys = Object.keys(prod)
        const values = Object.values(prod)
        try {
            const products = await this.getProducts()
            const { find, idx } = await this.getProductById(Number(id))
            keys.forEach((key, pos) => {
                find[key] = values[pos]
            });
            products[idx] = find
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
            return find
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts()
            const { find, idx } = await this.getProductById(Number(id))
            find.status = false
            products[idx] = find
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
            return find
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}
module.exports = ProductManager
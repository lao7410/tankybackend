const fs = require('fs')


class ProductManager {
    constructor(path) {
        this.path = path
    }
    addProduct = async (newItem) => {
        let productDb = await this.getProducts()
        try {
          if (productDb.length === 0) {
            newItem.id = 1
            productDb.push(newItem)
          } else {
            productDb = [ ...productDb, { ...newItem, id:productDb[productDb.length -1].id + 1}]
          }
          await fs.promises.writeFile(this.path, JSON.stringify(productDb, null,'\t'))
          console.log('Producto cargado en la base de datos');
        } catch (error) {
          console.log(error);
        }
      }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            try {
                const data = await fs.promises.readFile(this.path)
                const dataParsed = JSON.parse(data)
                return dataParsed
            }
            catch (err) {
                throw new Error("error trayendo products", err)
            }
        }
        else {
            await fs.promises.writeFile(this.path, '[]', 'utf-8')
            return []
        }
    }

    getProductById = async (id) => {
        const data = await this.getProducts()
        const find = data.find(prod => prod.id === id)
        const idx = data.findIndex(prod => prod.id === id)
        if (find) return { find, idx }
        else throw new Error("No exit prod")
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
          const productIndex = products.findIndex(prod => prod.id === id)
      
          if (productIndex === -1) {
            throw new Error("No se encontró el producto con id " + id)
          }
      
          products.splice(productIndex, 1)
          await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
          return products
        } catch (err) {
          throw new Error(err.message)
        }
      }
}
module.exports = ProductManager


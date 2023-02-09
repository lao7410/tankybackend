const fs = require('fs')   //PREGUNTAR A LU EL TEMA DE LOS MODULES Y LOS IMPORTS NO OLVIDAR

class CartMaganer {
    constructor(path) {
        this.path = path
    }
    addCart = async () => {
        try {
        const shopcart = {
            productos: []
        }
        const data = await this.getCarts()  // OK //revisar antes de entregar y comparar con productos
        data.length === 0 ? shopcart.id = 1 : shopcart.id = data[data.length - 1].id + 1
        const newData = JSON.stringify([...data, shopcart])
            await fs.promises.writeFile(this.path, newData, 'utf-8')
            return shopcart
        }
        catch (err) {
            throw new Error("no se crea el carsho", err)
        }
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            try {
                const data = await fs.promises.readFile(this.path)
                const dataParsed = JSON.parse(data)
                return dataParsed
            }
            catch (err) {
                throw new Error("Error", err)
            }
        }
        else {
            await fs.promises.writeFile(this.path, '[]', 'utf-8')  //devolver el array vacio!
            return []
        }
    }

    getCartsById = async (id) => {
        const data = await this.getCarts()
        const find = data.find(cart => cart.id === id)
        const idx = data.findIndex(cart => cart.id === id)
        if (find) return { find, idx }
        else throw new Error("No hay carsho")
    }

    getCartsProducts = async (id) => {
        try {
            const {find} = await this.getCartsById(id)
            return find.productos
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    addProductsToCart = async (cid, pid)=>{
        try{
            const carts = await this.getCarts()
            const {find: cart, idx} = await this.getCartsById(cid)
            const prodFind = cart.productos.find(prod=> prod.product === pid)
            !prodFind ? cart.productos.push({product: pid, quantity: 1}) : prodFind.quantity++
            carts[idx] = cart
            await fs.promises.writeFile(this.path, JSON.stringify(carts), 'utf-8')
            return carts
        }
        catch(err){
            throw new Error(err.message)
        }
    }
}

module.exports = CartMaganer
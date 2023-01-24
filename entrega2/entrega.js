const fs = require('fs')
const path = './productos.json' //esta variable podria estar oculta!!!!!!!!!!!!!!
export default class ProductManager { //genero la clase pero deberia poder optimizarla para que no sea solo para este codigo y un poco mas genereica
    constructor(path) {
        this.path = path
        this.products = [] //se instancia el array de productos vacios
    }
    addProduct = async (newItem) => {
        let productDb = await this.getProducts()
        const data = await productDb.find(product => product.code === newItem.code)
        try {
            if (data) {
                return console.log(`el producto ya esta y tiene el mismo codigo, modifique los campos`)
            }
            if (productDb.length === 0) {
                newItem.id = 1
                productDb.push(newItem)
            } else {
                productDb = [...productDb, { ...newItem, id: productDb[productDb.length - 1].id + 1 }]
            }
            fs.promises.writeFile(this.path, JSON.stringify(productDb, null, '\t')) //verificar con lu la sintax
            console.log('Carga');
        } catch (error) {
            console.log(error);
        }
    }

    consultarProducto = async () => {

        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8')
            console.log(data)
            const producto = JSON.parse(data)
            return producto
        }
        else {
            return this.products
        }
    }
    eliminarProduct(id) {
        let data = fs.readFileSync(this.path, 'utf-8') //lectura de la ruta que paso en la class

        let dataJS = JSON.parse(data)

        dataJS.splice((id - 1), 1)

        let contador = 1

        dataJS.forEach(product => {  // recorro productos para en contrar el id
            product.id = contador++
        })

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8') //mando null para sacar
    }


    updateProduct = async (id, update) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productDb = await JSON.parse(data)
        const index = await productDb.findIndex(product => product.id === id)
        if (index === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        productDb[index] = { ...update, id: productDb[index].id }
        fs.promises.writeFile(this.path, JSON.stringify(productDb, null, '\t'))
        console.log('Updated producto');
    }
    getProductsById = (id) => {
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJson = JSON.parse(data)

        let productDb = dataJson.find(product => product.id === id) //si es verdadero, va a entrar al 1er if x la neg del principop
        if (!productDb) {
            return `no existe el producto con id: ${id}`
        }
        return productDb
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

}
const productos = new ProductManager('./productos.json')

//////////////////////////////////////////////////////////////////////////////////////////////////

console.log("--------------------------------------espacio--------------------------------------")
console.log("--------------------------------------espacio2--------------------------------------")

console.log(productos.addProduct(
    {
        title: '10',
        description: '10 ',
        price: '90',
        thumbnai5l: 'Sin foto ',
        code: "10",
        stock: '10',
    }

)
)


/* console.log(productos.crearProducto({
        title: 'producto5',
       description: ' Este es un producto prueba2 ',
       price: 200,
       thumbnail: 'Sin imagen',
       code: 'abc123',
       stock: 1555555555 

})) 

/* console.log(productos.getProductsById(2))
console.log(productos.getProducts) */
console.log("--------------------------------------espacio2--------------------------------------")

/*  console.log(productos.eliminarProduct(3))  */

console.log("--------------------------------------espacio2--------------------------------------")
/* console.log(productos.updateProduct(2, {
    title: 'uodate',
    description: 'updatasadadesto es un producto',
    price: 5,
    thumbnail: 'sin imagen',
    code: 1,
    stock: 10
})) */

/* addProduct = (newItem) => {

        const productDb = this.products.find(product => product.code === newItem.code)
        if (productDb) {
            return `el producto ya esta y tiene el mismo codigo, modifique los campos`
        }
        if (newItem.title === '') {
            return 'campos vacios'
        }
        if (this.products.length === 0) {
            newItem.id = 1
            this.products.push(newItem)

        } else {
            this.products = [...this.products, { ...newItem, id: this.products[this.products.length - 1].id + 1 }]
        }

    }
    crearProducto = async (producto) => { //crear el producto y lo pasa al json
        const products = await this.consultarProducto()
        if (products.length === 0) { //asigna id del producto en caso que el hson sta vacio
            producto.id = 1
        } else {
            producto.id = products[products.length - 1].id + 1
        }
        products.push(producto)
        await fs.promises.writeFile(path, JSON.stringify(this.products)) //espera 
        return producto
    } */

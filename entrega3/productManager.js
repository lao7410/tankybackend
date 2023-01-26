
import fs from 'fs';
const path = './productos.json' //esta variable podria estar oculta!!!!!!!!!!!!!!
export class ProductManager { //genero la clase pero deberia poder optimizarla para que no sea solo para este codigo y un poco mas genereica
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

    consultarProducto = async (/* id */) => {
        /* const productDb = JSON.parse(data).find(product => product.id === id) */
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
//console.log("--------------------------------------espacio--------------------------------------")
/* console.log(productos.consultarProducto()) */
//console.log("--------------------------------------espacio2--------------------------------------")
  console.log(productos.addProduct(
    {
        title: 'Prueba de Product',
        description: 'Esto es una prueba 22',
        price: '10000',
        thumbnai5l: 'Sin foto ',
        code: "18",
        stock: '1',
    }

)
)

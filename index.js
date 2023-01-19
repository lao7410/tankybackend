const fs = require('fs')
class ProductManager { //genero la clase pero deberia poder optimizarla para que no sea solo para este codigo y un poco mas genereica
    constructor() {
        const fs = require('fs')
        this.products = [] //se instancia el array de productos vacios
    }
    addProduct = (newItem) => {

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
    getProductsById = (id) => {
        const productDb = this.products.find(product => product.id === id) //si es verdadero, va a entrar al 1er if x la neg del principop
        if (!productDb) {
            return `no existe el producto con id: ${id}`
        }
        return productDb
    }
    getProducts = () => this.products
}
const productos = new ProductManager()

const manejoProducto = async () => {
    const producto = [
        {
            id: 1,
            title: 'producto 1',
            description: 'not available',
            price: 100,
            thumbnail: 'not available',
            code: '100AAA',
            stock: 100,
        }
    ]
    let productoParse = JSON.stringify (producto)
    console.log(productoParse)
}
manejoProducto()


//SEGUNDA ENTREGA
//Realizar una clase de nombre “ProductManager”, 
//el cual permitirá trabajar con múltiples productos. 
//Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos
//La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir 
//la ruta a trabajar desde el momento de generar su instancia.
//Debe guardar objetos con el siguiente formato:
//id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
//title (nombre del producto)
//description (descripción del producto)
//price (precio)
//thumbnail (ruta de imagen)
//code (código identificador)
//stock (número de piezas disponibles)
//Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, 
//asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
//Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
//Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar
// (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
//Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
//  "id": 1,"title": "","description": "","price": 0,"stock": 0,"thumnail": "","code": ""


/* fs.writeFileSync('./data.txt','newItem','utf-8') // crear documento
const docu= fs.readFileSync('./data.txt','utf-8') //lectura del document
console.log(docu)
fs.appendFileSync('./data.txt','newItem2','utf-8') // agregando info al documento, si no esta el write, lo crea
console.log(docu) */

let contenido = null
fs.readFile('./data.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        //contenido =data
        console.log(data)
    }
})

fs.writeFile('./desafio.txt', Date(), 'utf-8', (err) => {
    if (err) {
        console.log(err)
    } else {
        fs.readFile('./desafio.txt', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        }
        )
    }
}
)
//escribir document con promise
const manejoArchivo = async () => {
    /*     try {
            await fs.promises.writeFile('./data.txt','ejemplo2','utf-8')
            console.log("escrito")
    }catch (err) {
        console.log(err)
    }
    } */

    //leer archivo con promise

    try {
        await fs.promises.appendFile('./data.txt', 'agregando item \n', 'utf-8')
        console.log("agregado", info)
    } catch (err) {
        console.log(err)
    }

    try {
        let info = await fs.promises.readFile('./data.txt', 'utf-8')
        console.log("lectura", info)
    } catch (err) {
        console.log(err)
    }

}
manejoArchivo()



console.log(productos.getProducts())
/* console.log(productos.addProduct({
    title: 'producto prueba',
    description: ' Este es un producto prueba ',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25

})) */

/* console.log(productos.addProduct(
    {
        title: 'producto1 ',
        description: ' Este es un producto prueba ',
        price: '200',
        thumbnail: 'Sin imagen',
        code: "abc1",
        stock: '10',
    },
    
)
)
console.log(productos.getProducts())

console.log(productos.addProduct(
    {
        title: 'producto1 ',
        description: ' Este es un producto prueba ',
        price: '200',
        thumbnail: 'Sin imagen',
        code: "abc12",
        stock: '10',
    },
    
)
)
 */
/* console.log(productos.addProduct({
    title: 'producto prueba',
    description: ' Este es un producto prueba ',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25

}))
console.log(productos.addProduct({
    title: 'producto ',
    description: ' Este es un producto prueba ',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc1',
    stock: 10

}))

console.log(productos.getProductsById(2))

console.log(productos.addProduct({
    title: '',
    description: 'esto es un producto',
    title: 1500,
    imagen: 'ruta imagen',
    code: 2,
    stock: 100
}))

console.log(productos.getProductsById(2))
console.log(productos.getProductsById(1)) */



/* console.log(productos.addProduct({
    title: 'a',
    description: ' Este es un producto prueba ',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 123,
    stock: 25

}))
console.log(productos.getProductsById(1)) */

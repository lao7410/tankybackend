
class ProductManager {
    constructor() {
        this.products = []
    }
    addProduct = (newItem) => {

        const productDb = this.products.find(product => product.code === newItem.code)
        if (productDb) {
            return `el producto ya esta y tiene el mismo codigo, cambie los campos`
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

console.log(productos.getProducts())

console.log(productos.addProduct(
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


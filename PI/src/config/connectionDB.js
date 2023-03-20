const { connect } = require('mongoose')
const { CartModel } = require('../models/cart.model')
const { ProductModel } = require('../models/product.model')
const { UserModel } = require('../models/user.model')

// const url = 'mongodb+srv://federicoaosandon:Federico1@cluster0.an130di.mongodb.net/coderhouse?retryWrites=true&w=majority'
const url = 'mongodb://localhost:27017/comision32270'

const dbConnection = async () => {
    try {
        await connect(url)
        console.log('DB conectada')
        
        //  indexación.

        // let resp = await UserModel.find().explain('executionStats')
        // let resp = await UserModel.find({first_name: 'Celia'}).explain('executionStats')
        // console.log(resp.executionStats)

        // creaciónj de un carrito vacio
        // const resp = await CartModel.create({})
        // console.log(resp)
        
        // creación de un producto
        // await ProductModel.create({
            //     title: 'Product 1',
            //     description: 'ESto es un producto',
            //     category: 'productos',
            //     code: '0010',
            //     stock: 100,
            //     price: 6000
            // })
            
            // const cart = await CartModel.findById({_id: '63fe90acf7edd2f4bd02fb48'})
            // cart.products.push({product: '63ee4e18b1c60e2b3abdd267'})
            // let resp =  await CartModel.findOneAndUpdate({_id: '63fe90acf7edd2f4bd02fb48'}, cart)
            // console.log(resp)
            
            const cart = await CartModel.find({_id: '63fe90acf7edd2f4bd02fb48'})
            console.log(JSON.stringify(cart, null, 2) )


    } catch (error) {
        console.log(error)
        process.exit()
    }
    
}

module.exports = { dbConnection }

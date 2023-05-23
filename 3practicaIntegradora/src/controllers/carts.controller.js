class CartsController {
    getCarts =  async (req, res) => {
        try {
            const carts = await Carts.getCarts()
            
            res.status(200).send({
                status: 'success',
                payload: carts
            })        
        } catch (error) {
            console.log(error)
        }
    }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            const resp = await Carts.getCart(cid)
            if (!resp.resp) {
                return res.status(401).json(resp)
                
            }
            res.status(200).json(resp)
            
        } catch (error) {
            console.log(error)
        }
    }

    createCart = async (req, res) => {
        try {
            const resp = await Carts.createCart()
            if (!resp) {
                return res.status(404).json(resp)
            }
        
            res.status(200).json(resp) 
        } catch (error) {
            console.log(err)
        }
        // const carrito = req.body
    }

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const product = { id: pid, quantity }
            const resp = await Carts.addProductInCart(cid, product)
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json(resp)        
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductFromCart  = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const resp = await Carts.deleteProductInCart(cid, pid)
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json(resp)        
        } catch (error) {
            console.log(error)
        }
    }

    deleteCart = async (req, res) => {
        try {
            const { cid } = req.params
            const resp = await Carts.deleteCart(cid) 
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
        }
    }

    async createTicket(req,res) {
        const {cid} = req.params
        // traer el carrito
        const cart =  cartService.getCart(cid)

        if(!cart) return res.status(401).send({
            status: 'error',
            error: cart
        })

        let productsNotPurchased = []
        let precioTotal= 0
        for(const item of cart.products){

            const productStock = item.product.stock
            const quantity = item.quantity
            
            if (quantity <= productStock) {
                await productService.updateProduct(item.product._id, {stock: stock - quantity})
                precioTotal +=(quantity * item.product.price)
            } else {
                productsNotPurchased.push(item.product._id)
            }

        
        }
        // todo lo que pide le modelo
        const ticket = {
            user: req.user,
            amount: precioTotal
        }

        let result = await cartService.createTicket(ticket)

        // eliminar del cart los que se compraron 
        if (productsNotPurchased.length > 0) {
            await cartService.deleteProductInCart(cid, cart.products.filter(item => !productsNotPurchased.includes(item.product._id)))
        } else {
            await cartService.deletCart(cid)
        }

        res.json({
            status: 'success',
            payload: 'ticket'
        })
    }

    
}

module.exports = new CartsController()

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

    
}

module.exports = new CartsController()

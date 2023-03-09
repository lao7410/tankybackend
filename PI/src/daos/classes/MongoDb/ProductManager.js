import productsModel from "../../models/productsModel.js";


export  class ProductManagerMongo {
  #products;
  constructor() {
    this.#products = [];
  }

  async getProducts () {
    this.#products = await productsModel.find({})
    return this.#products
  }

  async getProductById (id) {
    let product = await productsModel.findById(id)
    return product
  }

  async addProduct (title, description, price, thumbnail, code, stock, category) {
    // const {title, description, price, thumbnail, code, stock, category} = product
    try {
        let product = await productsModel.create({
        title,
        description,
        price,
        thumbnail: (thumbnail===undefined? "Sin imagen" : thumbnail),
        code,
        stock, 
        category
        })
        console.log('Product added');
        return (product)
    } catch (error) {
        return error
    }
  }

  async updateProduct (id, obj) {
    try {
         await productsModel.findByIdAndUpdate(id, obj, (err, doc)=>{
          if (err) console.log(err);
          else {console.log('updated');}
        })
    } catch (error) {
        console.log(error);
    }
  }

  async deleteProduct (id) {
    try {
        await productsModel.findByIdAndDelete(id, (err, doc)=>{
          if (err) console.log(err);
          else {console.log('deleted');}
        })
    } catch (error) {
        console.log(error);
    }
  }
}

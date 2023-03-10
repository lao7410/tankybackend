import ProductModel from "../../models/product.js";

export class ProductManager {
  #products;
  constructor() {
    this.#products = [];
  }

  async getProducts(limit = 10, page = 1, sort, query) {
    const skip = limit * (page - 1);
    const sortOptions = sort ? { price: sort === "asc" ? 1 : -1 } : null;
    const filterOptions = query ? { category: query } : {};

    try {
      let totalProducts;
      let totalPages;
      let products;

      if (!sort && !query && page === 1) {
        // Get all products when no parameters are provided
        products = await ProductModel.find();
        totalProducts = products.length;
        totalPages = 1;
      } else {
        // Get products based on provided parameters
        totalProducts = await ProductModel.countDocuments(filterOptions);
        totalPages = Math.ceil(totalProducts / limit);

        products = await ProductModel.find(filterOptions)
          .sort(sortOptions)
          .skip(skip)
          .limit(limit);
      }

      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = page < totalPages ? page + 1 : null;
      const hasPrevPage = prevPage !== null;
      const hasNextPage = nextPage !== null;
      const prevLink = prevPage ? `http://localhost:8080/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null;
      const nextLink = nextPage ? `http://localhost:8080/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null;

      return {
        status: "success",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message
      };
    }
  }

  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (product) {
        return {
          status: "success",
          payload: product
        };
      } else {
        return {
          status: "error",
          message: "Product not found."
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: error.message
      };
    }
  }
  async addProducts(title, description, price, thumbnail, code, stock, category) {
    // const {title, description, price, thumbnail, code, stock, category} = product
    try {
      let product = await ProductModel.create({
        title,
        description,
        price,
        thumbnail: (thumbnail === undefined ? "Sin imagen" : thumbnail),
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

  async updateProduct(id, obj) {
    try {
      await ProductModel.findByIdAndUpdate(id, obj, (err, doc) => {
        if (err) console.log(err);
        else { console.log('updated'); }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      await ProductModel.findByIdAndDelete(id, (err, doc) => {
        if (err) console.log(err);
        else { console.log('deleted'); }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
export default ProductManager
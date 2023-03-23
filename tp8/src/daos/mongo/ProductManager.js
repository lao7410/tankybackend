const { Types } = require("mongoose");
const modeloProducto = require("../../models/productModel");

class ProductManager {
  async addProduct(product) {
    // Buscar si existe un producto con el mismo código
    const existingProduct = await modeloProducto.findOne({ code: product.code });
    if (existingProduct) {
      throw new Error("Ya existe un producto con ese código");
    }
    const newProduct = new modeloProducto({
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
      status: product.status,
      code: product.code,
      stock: product.stock,
    });
    return newProduct.save();
  }


  getProducts = async (limit = 5, pageParam = 1, sort, category, status) => {
    let query = {};
    if (category) query.category = category;
    if (status !== undefined) query.status = Boolean(status);
    try {
      let dataProd;
      if (sort) {
        dataProd = await modeloProducto.paginate(query, {
          limit,
          page: pageParam,
          sort: { price: sort },
          lean: true
        });
      } else {
        dataProd = await modeloProducto.paginate(query, {
          limit,
          page: pageParam,
          lean: true
        });
      }
      const buildUrl = (order, page) =>
        `http://localhost:8080/api/products/?limit=${limit}&page=${Number(page) + order
        }${sort ? `&sort=${sort}` : ""}${status !== undefined ? `&status=${status}` : ""
        }${category ? `&category=${category}` : ""}`;
      const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } =
        dataProd;

      const parsedResponse = {
        status: "success",
        payload: docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? buildUrl(-1, pageParam) : null,
        nextLink: hasNextPage ? buildUrl(1, pageParam) : null
      };
      return parsedResponse;
    } catch (err) {
      throw new Error("Error al obtener los productos", err);
    }
  };

  getProductById = async (id) => {
    try {
      const dataProd = await modeloProducto.findById(id);
      if (dataProd) return dataProd;
      else throw new Error("Producto no encontrado");
    } catch (err) {
      throw new Error("Error al obtener el producto", err);
    }
  };

  updateProduct = async (id, newProd) => {
    try {
      await modeloProducto.updateOne({ _id: id }, newProd);
      console.log('Producto actualizado');
    } catch (err) {
      throw new Error('Error al actualizar el producto', err);
    }
  };

  deleteProduct = async (id) => {
    try {
      const parsedId = Types.ObjectId(id);
      const { deletedCount } = await modeloProducto.deleteOne({
        _id: parsedId
      });
      console.log('Producto eliminado');
      return deletedCount;
    } catch (err) {
      throw new Error('Error al eliminar el producto', err);
    }
  };
}

module.exports = ProductManager;

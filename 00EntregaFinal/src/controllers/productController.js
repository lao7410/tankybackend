// Ruta: /api/products
const getProducts = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort === "desc" ? -1 : 1;
      const query = req.query.query || "";
      const category = req.query.category || "";
      const availability = req.query.availability === "true";
  
      const filters = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };
  
      if (category) {
        filters.category = { $regex: category, $options: "i" };
      }
  
      if (availability) {
        filters.status = true;
      }
  
      const totalProducts = await Product.countDocuments(filters);
      const totalPages = Math.ceil(totalProducts / limit);
      const skip = (page - 1) * limit;
  
      const products = await Product.find(filters)
        .sort({ price: sort })
        .skip(skip)
        .limit(limit);
  
      res.json({
        status: "success",
        payload: products,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}` : null,
        nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}` : null,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = {
    getProducts,
  };
  
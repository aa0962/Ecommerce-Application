const Products = require('../models/productModel');

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.find();
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = res.body;

      if (!images) return res.status(500).json({ msg: 'No Image Upload' });

      const product = await Products.findOne({ product_id });

      if (product)
        return res.status(400).json({ msg: 'This product already exists' });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      res.json(newProduct);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = productCtrl;

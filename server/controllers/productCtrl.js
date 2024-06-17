// const Products = require('../models/productModel');
// const {query}=require('express');
// const mongoose = require('mongoose');

// //filter,sorting and pagination

// class APIfeatures{
//   constructor(query,queryString){
//     this.query=query;
//     this.queryString=queryString

//   }
//   filtering(){
//     const queryObj={...this.queryString}
//     console.log(queryObj)
//     const excludedFields=['page','sort','limit']
//     excludedFields.forEach(el => delete queryObj[el]);
//     console.log(queryObj)

  

//     let queryStr=JSON.stringify(queryObj)
//     queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
//     //console.log({queryObj,queryStr})
    

//     this.query.find(JSON.parse(queryStr))
    
//     return this
    

//   }

//   sorting(){

//   }
//   pagination(){

//   }
// }

// const productCtrl = {
//   getProducts: async (req, res) => {
//     try {
//       console.log(req.query)
//       const features=new APIfeatures(Products.find(),req.query)
//       const products = await features.query
//       res.json(products);
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   createProducts: async (req, res) => {
//     try {
//       const {
//         product_id,
//         title,
//         price,
//         description,
//         content,
//         images,
//         category,
//       } = req.body;//res.body

//       if (!images) return res.status(500).json({ msg: 'No Image Upload' });

//       const product = await Products.findOne({ product_id });

//       if (product)
//         return res.status(400).json({ msg: 'This product already exists' });

//       const newProduct = new Products({
//         product_id,
//         title: title.toLowerCase(),
//         price,
//         description,
//         content,
//         images,
//         category,
//       });

//       await newProduct.save();
//       res.json({msg:"Created a product successfully "});
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   deleteProduct: async (req, res) => {
//     try {
//           await Products.findByIdAndDelete(req.params.id)
//           res.json({msg:"Delete a product"})
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   updateProduct: async (req, res) => {
//     try {
      
//       const {
//         title,
//         price,
//         description,
//         content,
//         images,
//         category,
//       } = req.body;

//       if(!images) return res.status(500).json({msg:"No Image Upload"})

//       await Products.findOneAndUpdate({id:req.params.id},{
//         title:title.toLowerCase(),price,description,content,images,category
//       })

//       res.json({msg:"Updated a Product "})
        
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
// };
// module.exports = productCtrl;
const Products = require('../models/productModel');
const mongoose = require('mongoose');

// APIfeatures class for filtering, sorting, and pagination
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    console.log("Query object before deletion:", queryObj);

    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach(el => delete queryObj[el]);
    console.log("Query object after deletion:", queryObj);

    let queryStr = JSON.stringify(queryObj);
    console.log("Query string before replacement:", queryStr);

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
    console.log("Query string after replacement:", queryStr);

    const queryJSON = JSON.parse(queryStr);
    console.log("Final query object for MongoDB:", queryJSON);

    this.query = this.query.find(queryJSON);
    return this;
  }

  sorting() {
    // Sorting logic
  }

  pagination() {
    // Pagination logic
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      console.log("Request query:", req.query);

      const features = new APIfeatures(Products.find(), req.query).filtering();
      const products = await features.query;

      console.log("Products retrieved:", products);

      res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
          products
        }
      });
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
      } = req.body;

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

      await newProduct.save();
      res.json({ msg: "Created a product successfully " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) return res.status(500).json({ msg: "No Image Upload" });

      await Products.findOneAndUpdate({ _id: req.params.id }, {
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category
      });

      res.json({ msg: "Updated a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;


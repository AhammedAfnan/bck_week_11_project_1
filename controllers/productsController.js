const Product = require("../models/Product");

const productsControllers = {
  new: async (req, res) => {
    return res.render("admins/products/new");
  },

  create: async (req, res) => {
    const { title, description, price, mrp, stock, mainImg, images } = req.body;
    try {
      const product = new Product({
        title,
        description,
        price,
        mrp,
        stock,
        mainImg,
        images,
      });
      await product.save();
      return res.redirect("/admin/products");
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = productsControllers;

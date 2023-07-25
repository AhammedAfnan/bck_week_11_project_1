const Product = require("../models/Product");
const Category = require("../models/Category");
const path = require("path");
const User = require("../models/User");

const productsControllers = {
  index: async (req, res) => {
    try {
      const products = await Product.find({});
      return res.render("admins/products/index", { products });
    } catch (e) {
      console.log(e.message);
    }
  },

  userIndex: async (req, res) => {
    const { category } = req.query;
    try {
      if (!category) return res.redirect("/");
      const categoryName = await Category.findById(category);
      const products = await Product.find({ category });
      const user = await User.findById(req.session.userId);
      res.render("products/index", {
        user,
        products,
        categoryName: categoryName.name,
      });
    } catch (e) {
      console.log(e);
    }
  },

  new: async (req, res) => {
    const categories = await Category.find({});
    return res.render("admins/products/new", { categories });
  },

  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const categories = await Category.find({});
      const product = await Product.findById(id);
      return res.render("admins/products/edit", { categories, product });
    } catch (e) {
      console.log(e);
    }
  },

  create: async (req, res) => {
    const { title, description, price, mrp, stock, mainImg, images, category } =
      req.body;
    try {
      const imagePath = "uploads/" + req.file.filename;
      const product = new Product({
        title,
        description,
        price,
        mrp,
        stock,
        mainImg: imagePath,
        category,
      });
      await product.save();
      return res.redirect("/admin/products");
    } catch (e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, description, price, mrp, stock, category } = req.body;
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { $set: { title, description, price, mrp, stock, category } },
        { new: true }
      );
      console.log(product);
      return res.redirect("/admin/products");
    } catch (e) {
      console.log(e);
    }
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      const user = await User.findById(req.session.userId);
      res.render("products/show", { user, product });
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = productsControllers;

const Category = require("../models/Category");

const categoryController = {
  index: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.render("admins/categories/index", {
        categories,
      });
    } catch (error) {
      console.log(error);
    }
  },

  new: async (req, res) => {
    try {
      res.render("admins/categories/new", { error: null });
    } catch (e) {
      res.render("admins/categories/new", { error: e });
    }
  },

  create: async (req, res) => {
    const { name } = req.body;
    try {
      const exists = await Category.findOne({ name });
      if (exists)
        return res.render("admins/categories/new", {
          error: "Category already exists",
        });
      const category = new Category({ name });
      await category.save();
      return res.redirect("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.render("admins/categories/edit", { error: null, category });
  },

  update: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
      const exists = await Category.findOne({ name });
      const category = await Category.findById(id);
      if (exists)
        return res.render("admins/categories/edit", {
          error: "Category already exists",
          category,
        });
      await category.updateOne({ $set: { name } }, { new: true });
      return res.redirect("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.redirect("/admin/categories");
  },
};

module.exports = categoryController;

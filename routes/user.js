const router = require("express").Router();
const userController = require("../controllers/userController");
const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");

async function filterProduct(name) {
  const category = await Category.findOne({ name });
  const products = await Product.find({ category: category._id }).limit(5);
  return products
}

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const [mensProducts, femaleProducts] = await Promise.all([
      filterProduct("Male"),
      filterProduct("Female"),
    ]);
    return res.render("users/home", { user, mensProducts, femaleProducts });
  } catch (e) {
    res.render("users/home", { errors: e.message });
  }
});

router.get("/accounts/register", userController.new);
router.post("/accounts", userController.register);

router.get("/accounts/login", userController.login);
router.post("/accounts/session", userController.session);

module.exports = router;

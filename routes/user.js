const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const guest = require("../middlewares/guest");
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

// authentication

router.get("/accounts/register", guest, userController.new);
router.post("/accounts", guest, userController.register);

router.get("/accounts/login", guest, userController.login);
router.post("/accounts/session", guest, userController.session);

router.post('/accounts/logout', auth, userController.logout);

module.exports = router;

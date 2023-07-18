const router = require("express").Router();
const userController = require("../controllers/userController");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render("users/home", { user });
  } catch (e) {
    res.render("users/home", { errors: e });
  }
});

router.get("/accounts/register", userController.new);
router.post("/accounts", userController.register);

router.get("/accounts/login", userController.login);
router.post("/accounts/session", userController.session);

module.exports = router;

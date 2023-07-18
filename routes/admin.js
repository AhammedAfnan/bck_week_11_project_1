const adminController = require("../controllers/adminController");
const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");

router.get("/login", adminController.showLogin);
router.post("/session", adminController.session);

router.get("/dashboard", isAdmin, adminController.dashboard);

module.exports = router;

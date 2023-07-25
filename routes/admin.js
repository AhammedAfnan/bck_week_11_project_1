const adminController = require("../controllers/adminController");
const adminGuest = require("../middlewares/adminGuest");
const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");

router.get("/login", adminGuest, adminController.showLogin);
router.post("/session", adminGuest, adminController.session);

router.get("/dashboard", isAdmin, adminController.dashboard);

module.exports = router;

const router = require("express").Router();
const productsControllers = require("../controllers/productsController");

router.get("/admin/products/new", productsControllers.new);

module.exports = router;

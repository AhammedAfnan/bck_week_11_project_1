const categoryController = require("../controllers/categoryController");
const router = require("express").Router();

router.get("/", categoryController.index);
router.get("/new", categoryController.new);
router.post("/", categoryController.create);
router.get("/:id/edit", categoryController.edit);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;

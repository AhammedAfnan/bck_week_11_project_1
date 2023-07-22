const accountsController = require("../controllers/accountsController");

const router = require("express").Router();

router.get("/", accountsController.index);
router.put("/:id/block", accountsController.block);
router.put("/:id/unblock", accountsController.unblock);

module.exports = router;

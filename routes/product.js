const router = require("express").Router();
const productsControllers = require("../controllers/productsController");
const multer = require('multer');
const path = require('path');
const isAdmin = require("../middlewares/isAdmin");

const destination = path.join(__dirname, '../public/uploads');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// admin routes
router.get("/admin/products", isAdmin, productsControllers.index);
router.get("/admin/products/new", isAdmin, productsControllers.new);
router.post("/admin/products", isAdmin, upload.single('mainImg'), productsControllers.create);
router.get('/admin/products/:id/edit', isAdmin, productsControllers.edit);
router.put("/admin/products/:id", isAdmin, upload.single('mainImg'), productsControllers.update);

// user routes
router.get('/products', productsControllers.userIndex);
router.get('/products/:id', productsControllers.show);

module.exports = router;

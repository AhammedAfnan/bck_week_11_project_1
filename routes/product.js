const router = require("express").Router();
const productsControllers = require("../controllers/productsController");
const multer = require('multer');
const path = require('path');

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
router.get("/admin/products", productsControllers.index);
router.get("/admin/products/new", productsControllers.new);
router.post("/admin/products", upload.single('mainImg'), productsControllers.create);
router.get('/admin/products/:id/edit', productsControllers.edit);

// user routes
router.get('/products', productsControllers.userIndex);
router.get('/products/:id', productsControllers.show);

module.exports = router;

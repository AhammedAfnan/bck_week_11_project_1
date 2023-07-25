require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "uuidv5",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(methodOverride("_method"));

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e.message));

async function filterProduct(name) {
  const category = await Category.findOne({ name });
  const products = await Product.find({ category: category._id }).limit(5);
  return products
}

app.get('/', async (req, res) => {
  const user = await User.findById(req.session.userId);
  const [mensProducts, femaleProducts] = await Promise.all([
    filterProduct("Male"),
    filterProduct("Female"),
  ]);
  res.render('users/home', {user, mensProducts, femaleProducts});
})
app.use("/", require("./routes/user"));
app.use("/", require("./routes/product"));
app.use("/admin", require("./routes/admin"));
app.use("/admin/categories", require("./routes/category"));
app.use("/admin/accounts", require("./routes/accounts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

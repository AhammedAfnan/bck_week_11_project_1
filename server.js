require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");

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

app.use("/", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/admin/categories", require("./routes/category"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

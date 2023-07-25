const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = {
  new: async (req, res) => {
    res.render("users/register", {
      errors: null,
      firstName: null,
      lastName: null,
      email: null,
      mobile: null,
    });
  },

  login: async (req, res) => {
    res.render("users/login", { errors: null });
  },

  session: async (req, res) => {
    const { email, password } = req.body;
    try {
      0;
      const user = await User.findOne({ email });
      if (!user)
        return res.render("users/login", { errors: "User not found! " });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.render("users/login", { errors: "Password is wrong" });
      if (user.isBlocked)
        return res.render("users/login", { errors: "You's blocked!" });
      req.session.userId = user.id;
      res.redirect("/");
    } catch (e) {
      res.render("users/login", { errors: e });
    }
  },

  register: async (req, res) => {
    const { firstName, lastName, email, mobile, password, cpassword } =
      req.body;
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    try {
      if (firstName === "" || firstName === " ") {
        return res.render("users/register", {
          errors: "First Name is required",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (firstName.length <= 3) {
        return res.render("users/register", {
          errors: "First Name must be 3 characters",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (lastName === "") {
        return res.render("users/register", {
          errors: "Last Name is required",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (lastName.length <= 3) {
        return res.render("users/register", {
          errors: "Last Name must be 3 characters",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (email === "") {
        return res.render("users/register", {
          errors: "Email is required",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (!emailRegex.test(email)) {
        return res.render("users/register", {
          errors: "Email must be a valid email",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (mobile.length < 1) {
        return res.render("users/register", {
          errors: "Phone number is required",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (!/^[1-9]\d{9}$/.test(mobile)) {
        return res.render("users/register", {
          errors: "Phone number must be 10 digits or a valid number",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (password === "") {
        return res.render("users/register", {
          errors: "Password is required",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (password.length < 7) {
        return res.render("users/register", {
          errors: "Password atleast 8 characters",
          firstName,
          lastName,
          email,
          mobile,
        });
      }
      if (password !== cpassword)
        return res.render("users/register", {
          errors: "Password doesn't match",
          firstName,
          lastName,
          email,
          mobile,
        });

      const exists = await User.findOne({ email });
      if (exists)
        return res.render("users/register", { errors: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword,
      });
      if (user) {
        await user.save();
        req.session.userId = user.id;
        res.redirect("/");
      } else {
        res.render("users/register", { errors: "Something went wrong" });
      }
    } catch (e) {
      res.render("user/register", { errors: e });
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.redirect('/');
  },
};

module.exports = userController;

const bcrypt = require("bcrypt");
const User = require("../models/User");

const adminController = {
  showLogin: async (req, res) => {
    const { error } = req.query;
    res.render("admins/login", { error });
  },

  session: async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.render("admins/login", { error: "Admin not found! " });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.render("admins/login", { error: "Password is wrong" });
      if (user.isAdmin) {
        req.session.adminId = user.id;
        return res.redirect("/admin/dashboard");
      }
      return res.redirect(
        "/admin/login?error=" + encodeURIComponent("You'r note a admin")
      );
    } catch (e) {
      res.render("admins/login", { errors: e });
    }
  },

  dashboard: async (req, res) => {
    try {
      const admin = await User.findById(req.session.adminId);
      res.render("admins/dashboard", { error: null, admin });
    } catch (e) {
      res.render("admins/login", { error: e });
    }
  },
};

module.exports = adminController;

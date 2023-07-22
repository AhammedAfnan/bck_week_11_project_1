const User = require("../models/User");

const accountsController = {
  index: async (req, res) => {
    try {
      const users = await User.find({ isAdmin: false });
      return res.render("admins/accounts/index", { users });
    } catch (e) {
      console.log(e);
    }
  },

  block: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(
        id,
        { $set: { isBlocked: true } },
        { new: true }
      );
      res.redirect("/admin/accounts");
    } catch (e) {
      console.log(e);
    }
  },

  unblock: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(
        id,
        { $set: { isBlocked: false } },
        { new: true }
      );
      return res.redirect("/admin/accounts");
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = accountsController;

const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.session.adminId);

  if (user && user.isAdmin) {
    return next();
  }

  return res.redirect(
    `/admin/login?error=${encodeURIComponent(
      "You don't have access to do this!"
    )}`
  );
};

module.exports = isAdmin;

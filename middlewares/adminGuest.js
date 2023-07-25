module.exports = (req, res, next) => {
  if (!req.session.adminId) {
    return next();
  }

  return res.redirect('/admin/dashboard');
}
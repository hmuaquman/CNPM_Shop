// Admin Dashboard Controller
exports.dashboard = (req, res) => {
  res.render("pages/admin/dashboard", {
    title: "Admin Dashboard - Tech4U",
    layout: "layouts/admin",
    user: req.user,
  });
};

// Middleware kiểm tra quyền admin
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    req.flash("error_msg", "Bạn không có quyền truy cập trang này");
    return res.redirect("/");
  }
  next();
};

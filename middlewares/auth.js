const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Lấy thông tin user nếu đã đăng nhập
exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
      const user = await User.findById(decoded.id);
      if (user) {
        res.locals.user = user;
      }
    }
    next();
  } catch (error) {
    res.locals.user = null;
    next();
  }
};

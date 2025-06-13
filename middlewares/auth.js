const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./asyncHandler");

// Middleware to make user info available in templates if logged in
exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        res.locals.user = user; // For EJS templates
        req.user = user; // For controllers
      }
    } catch (error) {
      // If token is invalid or expired, clear it and proceed as guest
      console.error('Token verification error in isLoggedIn:', error.message);
      res.clearCookie('token');
      res.locals.user = null;
      req.user = null;
    }
  }
  next();
});

// Middleware to protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    req.flash('error_msg', 'Vui lòng đăng nhập để truy cập trang này.');
    return res.redirect('/auth/login');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
        req.flash('error_msg', 'Người dùng không tồn tại.');
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }

    res.locals.user = req.user; // Ensure res.locals.user is also set for protected routes
    next();
  } catch (error) {
    console.error('Token verification error in protect:', error.message);
    req.flash('error_msg', 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.');
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }
});

// Middleware to grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      req.flash('error_msg', 'Bạn không có quyền truy cập vào tài nguyên này.');
      // Redirect to a suitable page, e.g., home or previous page
      // For now, redirecting to home. Consider a more specific 'unauthorized' page.
      return res.redirect('/'); 
    }
    next();
  };
};

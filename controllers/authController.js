const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Tạo token JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "30d",
  });
};

// Hiển thị form đăng ký
exports.showRegisterForm = (req, res) => {
  res.render("pages/auth/register", {
    title: "Đăng ký tài khoản",
  });
};

// Xử lý đăng ký
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.flash("error_msg", "Email đã được sử dụng");
      return res.redirect("/auth/register");
    }

    // Tạo user mới
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      address,
    });

    // Đăng nhập user và redirect
    const token = createToken(user._id);

    // Lưu token vào cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    req.flash("success_msg", "Đăng ký thành công!");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Có lỗi xảy ra khi đăng ký");
    res.redirect("/auth/register");
  }
};

// Hiển thị form đăng nhập
exports.showLoginForm = (req, res) => {
  res.render("pages/auth/login", {
    title: "Đăng nhập",
  });
};

// Xử lý đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email tồn tại
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      req.flash("error_msg", "Email hoặc mật khẩu không chính xác");
      return res.redirect("/auth/login");
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      req.flash("error_msg", "Email hoặc mật khẩu không chính xác");
      return res.redirect("/auth/login");
    }

    // Tạo và lưu token
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    req.flash("success_msg", "Đăng nhập thành công!");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Có lỗi xảy ra khi đăng nhập");
    res.redirect("/auth/login");
  }
};

// Đăng xuất
exports.logout = (req, res) => {
  res.clearCookie("token");
  req.flash("success_msg", "Đăng xuất thành công!");
  res.redirect("/auth/login");
};

// Middleware kiểm tra đăng nhập
exports.protect = async (req, res, next) => {
  try {
    // 1) Lấy token từ cookie
    const token = req.cookies.token;

    if (!token) {
      req.flash("error_msg", "Vui lòng đăng nhập để tiếp tục");
      return res.redirect("/auth/login");
    }

    // 2) Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    // 3) Kiểm tra user còn tồn tại không
    const user = await User.findById(decoded.id);
    if (!user) {
      res.clearCookie("token");
      req.flash("error_msg", "Người dùng không còn tồn tại");
      return res.redirect("/auth/login");
    }

    // 4) Lưu thông tin user vào req để sử dụng sau này
    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    req.flash("error_msg", "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại");
    res.redirect("/auth/login");
  }
};

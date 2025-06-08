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
    layout: "layouts/auth",
  });
};

// Xử lý đăng ký
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      userName,
      email,
      password,
      phone,
      addresses,
      agreeTerms,
    } = req.body;

    // Kiểm tra checkbox đồng ý điều khoản
    if (!agreeTerms) {
      req.flash("error_msg", "Bạn phải đồng ý với điều khoản dịch vụ");
      return res.redirect("/auth/register");
    }

    // Kiểm tra user đã tồn tại
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      req.flash("error_msg", "Email hoặc tên đăng nhập đã tồn tại");
      return res.redirect("/auth/register");
    }

    // Tạo user mới
    const newUser = new User({
      fullName,
      userName,
      email,
      password,
      phone,
      addresses: addresses ? [addresses[0]] : [],
      role: "customer",
    });

    await newUser.save();

    req.flash("success_msg", "Đăng ký thành công! Vui lòng đăng nhập");
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Register error:", error);
    req.flash("error_msg", "Có lỗi xảy ra khi đăng ký");
    res.redirect("/auth/register");
  }
};

// Hiển thị form đăng nhập
exports.showLoginForm = (req, res) => {
  res.render("pages/auth/login", {
    title: "Đăng nhập",
    layout: "layouts/auth",
  });
};

// Xử lý đăng nhập
exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    console.log("🔍 Login attempt:", {
      usernameOrEmail,
      passwordLength: password?.length,
    });

    // Tìm user theo username HOẶC email
    const user = await User.findOne({
      $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("+password");

    if (!user) {
      console.log("❌ User not found");
      req.flash("error_msg", "Tài khoản hoặc mật khẩu không chính xác");
      return res.redirect("/auth/login");
    }

    console.log("✓ User found:", user.userName, user.email, "Role:", user.role);

    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(password);
    console.log("🔓 Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match");
      req.flash("error_msg", "Tài khoản hoặc mật khẩu không chính xác");
      return res.redirect("/auth/login");
    }

    // Tạo và lưu token
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log(
      "✅ Login successful for user:",
      user.userName,
      "Role:",
      user.role
    );
    req.flash("success_msg", "Đăng nhập thành công!");

    // Phân quyền dựa trên role
    if (user.role === "admin") {
      console.log("🔑 Redirecting to admin dashboard");
      return res.redirect("/admin/dashboard");
    } else {
      console.log("👤 Redirecting to user home");
      return res.redirect("/");
    }
  } catch (error) {
    console.error("💥 Login error:", error);
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

// Middleware kiểm tra quyền admin
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    req.flash("error_msg", "Bạn không có quyền truy cập trang này");
    return res.redirect("/");
  }
  next();
};

exports.adminDashboard = (req, res) => {
  res.render("pages/admin/dashboard", {
    title: "Admin Dashboard - Tech4U",
    layout: "layouts/admin",
    user: req.user,
  });
};

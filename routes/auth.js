const express = require("express");
const router = express.Router();
const {
  showLoginForm,
  login,
  showRegisterForm,
  register,
  logout,
} = require("../controllers/authController");

// Đăng ký
router.get("/register", showRegisterForm);
router.post("/register", register);

// Đăng nhập
router.get("/login", showLoginForm);
router.post("/login", login);

// Đăng xuất
router.get("/logout", logout);

module.exports = router;

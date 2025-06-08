const express = require("express");
const router = express.Router();
const {
  protect,
  requireAdmin,
  adminDashboard,
} = require("../controllers/authController");

// Áp dụng middleware bảo vệ cho tất cả routes admin
router.use(protect);
router.use(requireAdmin);

// Admin Dashboard
router.get("/dashboard", adminDashboard);

module.exports = router;

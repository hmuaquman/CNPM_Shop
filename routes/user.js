const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const { protect } = require("../controllers/authController");

// Tất cả routes đều cần đăng nhập
router.use(protect);

// Thông tin tài khoản
router.get("/profile", userController.getProfile);
router.post("/profile", userController.updateProfile);

// Cập nhật địa chỉ giao hàng
router.post("/address/update", userController.updateAddress);

// Lịch sử mua hàng
router.get("/orders", orderController.getMyOrders);

module.exports = router;

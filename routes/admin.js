// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const orderController = require("../controllers/orderController");

// Kiểm tra xem adminController có đúng không
console.log("Admin controller:", Object.keys(adminController));

// Route cho dashboard - CHỈ DÙNG dashboard
router.get("/dashboard", adminController.dashboard);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderDetailsAdmin);
router.post("/orders/:id/change-status", orderController.changeOrderStatus);
module.exports = router;

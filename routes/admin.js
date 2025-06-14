// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const orderController = require("../controllers/orderController");

// Kiểm tra xem adminController có đúng không
console.log("Admin controller:", Object.keys(adminController));

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderDetailsAdmin);
router.post("/orders/:id/change-status", orderController.changeOrderStatus);
router.get("/dashboard", adminController.dashboard);
// User Management Routes
router.get("/users", adminController.userManagement);
router.get("/users/create", adminController.createUserForm);
router.post("/users/create", adminController.createUser);
router.get("/users/edit/:id", adminController.editUserForm);
router.post("/users/update/:id", adminController.updateUser);
router.get("/users/delete/:id", adminController.deleteUser);
router.get("/users/:id", adminController.userDetails);

module.exports = router;

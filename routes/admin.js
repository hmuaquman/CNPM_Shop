// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const orderController = require("../controllers/orderController");

// Kiểm tra xem adminController có đúng không
console.log("Admin controller:", Object.keys(adminController));

// Product Management Routes
router.get("/products", adminController.productDashboard);
router.get("/products/add-product", adminController.addProductForm);
router.post("/products/add-product", adminController.addProduct);
router.get("/products/delete-product", adminController.deleteProductForm);
router.post("/products/delete-product/:id", adminController.deleteProduct);
router.get("/products/edit-product", adminController.editProductForm);
router.get("/products/edit-product/:id", adminController.editOneProductForm);
router.post("/products/edit-product/:id", adminController.editOneProduct);
router.get("/products/update-price", adminController.priceUpdateForm);
router.post("/products/update-price", adminController.priceUpdate);

// Order Management Routes
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

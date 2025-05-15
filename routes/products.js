const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Hiển thị danh sách sản phẩm
router.get("/", getProducts);

// Hiển thị chi tiết sản phẩm
router.get("/:id", getProductById);

module.exports = router;

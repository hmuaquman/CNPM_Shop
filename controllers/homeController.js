const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getHomePage = async (req, res) => {
  try {
    // Lấy 8 sản phẩm mới nhất
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category");

    // Lấy danh sách danh mục
    const categories = await Category.find();

    res.render("pages/home", {
      title: "Trang chủ - Electronic Store",
      latestProducts,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.render("pages/home", {
      title: "Trang chủ - Electronic Store",
      latestProducts: [],
      categories: [],
    });
  }
};

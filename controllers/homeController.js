const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getHomePage = async (req, res) => {
  try {
    // Lấy 8 sản phẩm mới nhất
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category");

    // Lấy 4 sản phẩm nổi bật
    const featuredProducts = await Product.find({ featured: true })
      .limit(4)
      .populate("category");

    // Lấy sản phẩm đang giảm giá (có discount)
    const discountedProducts = await Product.find({
      discountPercentage: { $gt: 0 },
      discountStartDate: { $lte: new Date() },
      discountEndDate: { $gte: new Date() },
    })
      .sort({ discountPercentage: -1 })
      .limit(4)
      .populate("category");

    // Lấy danh sách danh mục
    const categories = await Category.find();

    res.render("pages/home", {
      title: "Trang chủ - Electronic Store",
      latestProducts,
      featuredProducts,
      discountedProducts,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.render("pages/home", {
      title: "Trang chủ - Electronic Store",
      latestProducts: [],
      featuredProducts: [],
      discountedProducts: [],
      categories: [],
    });
  }
};

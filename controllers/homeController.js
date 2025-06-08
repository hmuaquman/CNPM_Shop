const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getHomePage = async (req, res) => {
  try {
    // Lấy sản phẩm mới nhất (6 sản phẩm)
    const latestProducts = await Product.find({ status: "active" })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    // Lấy tất cả categories
    const categories = await Category.find().sort({ name: 1 });

    console.log("Categories found:", categories.length);
    console.log("Products found:", latestProducts.length);

    res.render("pages/home", {
      title: "Tech4U - Cửa hàng điện tử",
      layout: "layouts/main",
      latestProducts,
      categories,
      isHomePage: true,
      // Helper functions
      formatPrice: (price) => {
        return price.toLocaleString("vi-VN") + "₫";
      },
      truncateText: (text, length) => {
        return text.length > length ? text.substring(0, length) + "..." : text;
      },
    });
  } catch (error) {
    console.error("Error loading home page:", error);
    res.render("pages/home", {
      title: "Tech4U - Cửa hàng điện tử",
      layout: "layouts/main",
      latestProducts: [],
      categories: [],
      isHomePage: true,
      // Helper functions
      formatPrice: (price) => {
        return price.toLocaleString("vi-VN") + "₫";
      },
      truncateText: (text, length) => {
        return text.length > length ? text.substring(0, length) + "..." : text;
      },
    });
  }
};

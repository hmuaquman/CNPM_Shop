const Product = require("../models/Product");
const Category = require("../models/Category");
const Attribute = require("../models/Attribute");

// Hiển thị danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    // Lọc theo danh mục nếu có
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Tìm kiếm theo tên nếu có
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    // Phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    // Lấy danh sách danh mục
    const categories = await Category.find();

    res.render("pages/products/index", {
      title: "Danh sách sản phẩm",
      products,
      categories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      query: req.query,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Có lỗi xảy ra khi lấy danh sách sản phẩm");
    res.redirect("/");
  }
};

// Hiển thị chi tiết sản phẩm
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("attributeValues.attribute");

    if (!product) {
      req.flash("error_msg", "Không tìm thấy sản phẩm");
      return res.redirect("/products");
    }

    // Lấy sản phẩm tương tự
    const similarProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
    }).limit(4);

    res.render("pages/products/show", {
      title: product.name,
      product,
      similarProducts,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Có lỗi xảy ra khi lấy thông tin sản phẩm");
    res.redirect("/products");
  }
};

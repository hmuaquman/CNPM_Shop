const Product = require("../models/Product");
const Category = require("../models/Category");
const Attribute = require("../models/Attribute");
const Review = require("../models/Review");

// Hiển thị danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    // Xử lý filter và pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Xây dựng query filters
    const filter = {};

    // Filter theo category nếu có
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter theo brand nếu có
    if (req.query.brand) {
      filter.brand = req.query.brand;
    }

    // Filter theo giá nếu có
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseInt(req.query.maxPrice);
      }
    }

    // Filter sản phẩm có khuyến mãi
    if (req.query.onSale === "true") {
      filter.discountPercentage = { $gt: 0 };
    }

    // Tìm danh sách sản phẩm với filter
    const products = await Product.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Đếm tổng số sản phẩm thỏa mãn filter
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Lấy danh sách categories và brands để hiển thị filter
    const categories = await Category.find({ status: "active" });
    const brands = await Product.distinct("brand");

    res.render("pages/products/index", {
      title: "Danh sách sản phẩm",
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      categories,
      brands,
      query: req.query,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Có lỗi xảy ra khi tải danh sách sản phẩm");
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

    // Lấy reviews của sản phẩm
    const reviews = await Review.find({
      product: product._id,
      isApproved: true,
    }).populate("user", "fullName");

    // Tính trung bình rating
    let ratingStats = { average: 0, count: 0 };
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      ratingStats = {
        average: totalRating / reviews.length,
        count: reviews.length,
      };
    }

    // Lấy sản phẩm tương tự
    const similarProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
    }).limit(4);

    // Xử lý và chuẩn bị dữ liệu variants
    const variantAttributes = prepareVariantAttributes(product.variants || []);

    // Xác định variant mặc định
    const defaultVariant =
      product.variants?.find((v) => v.isDefault) || product.variants?.[0];

    // Format dữ liệu sản phẩm để view dễ sử dụng
    const formattedProduct = {
      ...product.toObject(),
      hasDiscount: product.discountPercentage > 0,
      inStock: product.quantity > 0,
      defaultVariantSku: defaultVariant?.sku || "",
    };

    // Hàm format giá tiền
    const formatPrice = (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    };

    res.render("pages/products/show", {
      title: product.name,
      product: formattedProduct,
      similarProducts,
      reviews,
      ratingStats,
      variantAttributes,
      defaultVariant,
      formatPrice,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Có lỗi xảy ra khi lấy thông tin sản phẩm");
    res.redirect("/products");
  }
};

/**
 * Xử lý và tạo danh sách thuộc tính từ variants sản phẩm
 */
function prepareVariantAttributes(variants) {
  const variantAttributes = {};

  variants.forEach((variant) => {
    if (variant.attributes) {
      Object.keys(variant.attributes).forEach((attrName) => {
        if (!variantAttributes[attrName]) {
          variantAttributes[attrName] = [];
        }

        const attrValue = variant.attributes[attrName];
        if (attrValue && !variantAttributes[attrName].includes(attrValue)) {
          variantAttributes[attrName].push(attrValue);
        }
      });
    }
  });

  return variantAttributes;
}

/**
 * Kiểm tra xem một variant có phải là mặc định không và thuộc tính có khớp không
 */
exports.isDefaultVariantAttribute = (defaultVariant, attrName, attrValue) => {
  return (
    defaultVariant &&
    defaultVariant.attributes &&
    defaultVariant.attributes[attrName] === attrValue
  );
};

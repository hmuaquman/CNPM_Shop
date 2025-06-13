const Product = require("../models/Product");
const Category = require("../models/Category");
const Attribute = require("../models/Attribute");
const Review = require("../models/Review");

exports.getProducts = async (req, res) => {
  try {
    // Lấy categories trước
    const categories = await Category.find({}).sort({ name: 1 });

    // Lấy brands từ products
    const brands = await Product.distinct("brand");

    // Query products logic...
    let query = {};
    const {
      category,
      search,
      brand,
      minPrice,
      maxPrice,
      sort,
      discount,
      featured,
    } = req.query;

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    if (brand) {
      query.brand = brand;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (discount === "true") {
      query.discountPercentage = { $gt: 0 };
    }

    if (featured === "true") {
      query.featured = true;
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default: newest first
    if (sort && sort !== "undefined") {
      switch (sort) {
        case "price_asc":
          sortOptions = { price: 1 };
          break;
        case "price_desc":
          sortOptions = { price: -1 };
          break;
        case "name_asc":
          sortOptions = { name: 1 };
          break;
        case "name_desc":
          sortOptions = { name: -1 };
          break;
        default:
          sortOptions = { createdAt: -1 };
      }
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Render với debug data
    res.render("pages/products/index", {
      title: "Sản phẩm",
      layout: "layouts/main",
      products,
      categories,
      brands,
      query: req.query,
      currentPage: page,
      totalPages,
      totalProducts,
      formatPrice: (price) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
      },
    });
  } catch (error) {
    console.error("❌ Error loading products:", error);
    req.flash("error_msg", "Có lỗi xảy ra khi tải danh sách sản phẩm");
    res.redirect("/");
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get product với populate category và attributeValues
    const product = await Product.findById(id)
      .populate("category", "name description")
      .populate("attributeValues.attribute", "name");

    if (!product) {
      return res.status(404).render("pages/404", {
        title: "Sản phẩm không tồn tại",
        layout: "layouts/main",
      });
    }

    // Lấy reviews của sản phẩm
    const reviews = await Review.find({
      product: product._id,
      isApproved: true,
    })
      .populate("user", "fullName userName")
      .sort({ createdAt: -1 });

    // Tính trung bình rating sử dụng static method từ Review model
    let ratingStats = await Review.calculateAverageRating(product._id);

    // Get sản phẩm tương tự cùng category
    const similarProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      status: "active",
    })
      .populate("category", "name")
      .limit(4);

    // Get tất cả categories cho sidebar
    const categories = await Category.find({ status: "active" }).sort({
      name: 1,
    });

    // Get unique brands cho filter
    const brands = await Product.distinct("brand", { status: "active" });

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

    // Debug log
    console.log("📦 Product detail loaded:", {
      product: product.name,
      reviews: reviews.length,
      ratingStats,
      variants: product.variants?.length || 0,
    });

    res.render("pages/products/show", {
      title: product.name,
      layout: "layouts/main",
      product: formattedProduct,
      similarProducts,
      categories,
      brands: brands.sort(),
      reviews,
      ratingStats,
      variantAttributes,
      defaultVariant,
      formatPrice: (price) => price.toLocaleString("vi-VN") + "₫",
    });
  } catch (error) {
    console.error("Error loading product detail:", error);
    res.status(404).render("pages/404", {
      title: "Không tìm thấy sản phẩm",
      layout: "layouts/main",
      message: "Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    });
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

const Product = require("../models/Product");
const Category = require("../models/Category");
const Attribute = require("../models/Attribute");
const Review = require("../models/Review");

exports.getProducts = async (req, res) => {
  try {
    let query = { status: "active" };
    const {
      category,
      search,
      brand,
      minPrice,
      maxPrice,
      page = 1,
      sort,
      onSale,
      featured,
    } = req.query;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Filter theo category ObjectId
    if (category) {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Brand filter
    if (brand) {
      query.brand = brand;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Filter sản phẩm có khuyến mãi
    if (onSale === "true") {
      query.discountPercentage = { $gt: 0 };
    }

    // Filter sản phẩm nổi bật
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

    // Get products với pagination
    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get total count cho pagination
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get tất cả categories cho filter
    const categories = await Category.find({ status: "active" }).sort({
      name: 1,
    });

    // Get unique brands cho filter
    const brands = await Product.distinct("brand", { status: "active" });

    // Tìm category hiện tại để hiển thị title
    let currentCategory = null;
    if (category) {
      currentCategory = await Category.findById(category);
    }

    // Debug log
    console.log("Categories found:", categories.length);
    console.log("Brands found:", brands.length);
    console.log("Products found:", products.length);

    res.render("pages/products/index", {
      title: currentCategory
        ? `Sản phẩm - ${currentCategory.name}`
        : "Sản phẩm",
      layout: "layouts/main",
      products,
      categories,
      brands: brands.sort(),
      currentFilters: {
        category,
        search,
        brand,
        minPrice,
        maxPrice,
        sort,
        onSale,
        featured,
      },
      query: {
        category,
        search,
        brand,
        minPrice,
        maxPrice,
        sort,
        onSale,
        featured,
      },
      currentPage: parseInt(page),
      totalPages,
      totalProducts,
      currentCategory,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      formatPrice: (price) => price.toLocaleString("vi-VN") + "₫",
    });
  } catch (error) {
    console.error("Error loading products:", error);
    res.render("pages/products/index", {
      title: "Sản phẩm",
      layout: "layouts/main",
      products: [],
      categories: [],
      brands: [],
      currentFilters: {},
      query: {},
      currentPage: 1,
      totalPages: 0,
      totalProducts: 0,
      currentCategory: null,
      pagination: {
        currentPage: 1,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
      formatPrice: (price) => price.toLocaleString("vi-VN") + "₫",
    });
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

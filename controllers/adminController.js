// controllers/adminController.js

const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Category = require("../models/Category");
const Review = require("../models/Review");

// Admin Dashboard Controller - SỬA LẠI ĐỂ RENDER TEMPLATE
exports.dashboard = async (req, res) => {
  try {
    // Lấy ngày hiện tại và các mốc thời gian
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // 1. BASIC STATS
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalCategories = await Category.countDocuments();

    let totalReviews = 0;
    try {
      totalReviews = await Review.countDocuments();
    } catch (error) {
      console.log("Review model not available");
    }

    // 2. SALES STATISTICS
    let salesStats = {
      totalRevenue: 0,
      revenueIncrease: 0,
      totalOrders: 0,
      ordersIncrease: 0,
      newCustomers: 0,
      customersIncrease: 0,
    };

    let monthlySales = [];
    let topProducts = [];
    let salesByCategory = [];
    let recentActivities = [];

    try {
      // Kiểm tra xem có orders không
      const orderCount = await Order.countDocuments();

      if (orderCount > 0) {
        // Lấy orders tháng hiện tại
        const currentMonthOrders = await Order.find({
          createdAt: { $gte: currentMonth },
          // Bỏ status: 'completed' nếu model không có field này
        });

        // Tính total revenue
        salesStats.totalRevenue = currentMonthOrders.reduce((sum, order) => {
          return sum + (order.totalAmount || order.total || 0);
        }, 0);

        salesStats.totalOrders = currentMonthOrders.length;

        // Lấy orders tháng trước
        const lastMonthOrders = await Order.find({
          createdAt: { $gte: lastMonth, $lte: lastMonthEnd },
        });

        const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => {
          return sum + (order.totalAmount || order.total || 0);
        }, 0);

        // Tính % tăng trưởng
        salesStats.revenueIncrease =
          lastMonthRevenue > 0
            ? (
                ((salesStats.totalRevenue - lastMonthRevenue) /
                  lastMonthRevenue) *
                100
              ).toFixed(1)
            : 0;

        salesStats.ordersIncrease =
          lastMonthOrders.length > 0
            ? (
                ((salesStats.totalOrders - lastMonthOrders.length) /
                  lastMonthOrders.length) *
                100
              ).toFixed(1)
            : 0;

        // 3. MONTHLY SALES DATA (6 tháng gần nhất)
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        for (let i = 5; i >= 0; i--) {
          const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(
            now.getFullYear(),
            now.getMonth() - i + 1,
            0
          );

          const monthOrders = await Order.find({
            createdAt: { $gte: monthStart, $lte: monthEnd },
          });

          const monthRevenue = monthOrders.reduce((sum, order) => {
            return sum + (order.totalAmount || order.total || 0);
          }, 0);

          monthlySales.push({
            month: monthNames[monthStart.getMonth()],
            total: monthRevenue,
            count: monthOrders.length,
          });
        }
      }

      // 4. NEW CUSTOMERS
      salesStats.newCustomers = await User.countDocuments({
        createdAt: { $gte: currentMonth },
      });

      const lastMonthCustomers = await User.countDocuments({
        createdAt: { $gte: lastMonth, $lte: lastMonthEnd },
      });

      salesStats.customersIncrease =
        lastMonthCustomers > 0
          ? (
              ((salesStats.newCustomers - lastMonthCustomers) /
                lastMonthCustomers) *
              100
            ).toFixed(1)
          : 0;
    } catch (error) {
      console.log("Error calculating sales stats:", error.message);
    }

    // 5. TOP PRODUCTS (từ seeded data)
    try {
      const products = await Product.find()
        .populate("category")
        .sort({ createdAt: -1 })
        .limit(5);

      // Tạo mock data dựa trên products thật
      topProducts = products.map((product, index) => ({
        name: product.name,
        totalSold: Math.floor(Math.random() * 100) + 20,
        percentage: Math.floor(Math.random() * 40) + 40,
      }));
    } catch (error) {
      console.log("Error getting top products:", error.message);
    }

    // 6. SALES BY CATEGORY
    try {
      const categories = await Category.find();
      const colors = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

      salesByCategory = categories.slice(0, 4).map((category, index) => ({
        name: category.name,
        percentage: Math.floor(Math.random() * 30) + 15,
        color: colors[index],
      }));
    } catch (error) {
      console.log("Error getting sales by category:", error.message);
    }

    // 7. RECENT ACTIVITIES
    try {
      recentActivities = await Product.find()
        .populate("category")
        .sort({ updatedAt: -1 })
        .limit(5);
    } catch (error) {
      console.log("Error getting recent activities:", error.message);
    }

    // Tính max value cho monthly sales chart
    const maxMonthlySales = Math.max(...monthlySales.map((m) => m.total), 1);

    // RENDER TEMPLATE VỚI DỮ LIỆU - KHÔNG PHẢI JSON
    res.render("pages/admin/dashboard", {
      title: "Admin Dashboard - Tech4U",
      layout: "layouts/admin",
      user: req.user,
      // Truyền tất cả dữ liệu vào template
      salesStats: salesStats,
      monthlySales: monthlySales,
      maxMonthlySales: maxMonthlySales,
      topProducts: topProducts,
      salesByCategory: salesByCategory,
      recentActivities: recentActivities,
      basicStats: {
        totalProducts: totalProducts,
        totalUsers: totalUsers,
        totalCategories: totalCategories,
        totalReviews: totalReviews,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Không thể tải dashboard",
      error: error,
    });
  }
};

// XÓA HOẶC COMMENT LẠI FUNCTION salesStatistics VÌ KHÔNG CẦN THIẾT NỮA
// exports.salesStatistics = async (req, res) => { ... }

// Middleware kiểm tra quyền admin
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    req.flash("error_msg", "Bạn không có quyền truy cập trang này");
    return res.redirect("/");
  }
  next();
};

// User Management
exports.userManagement = async (req, res) => {
  try {
    const User = require("../models/User");

    // Lấy query parameters cho filtering và pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Tạo query object
    const query = {};

    // Thêm search nếu có
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Thêm filter theo role nếu có
    if (role) {
      query.role = role;
    }

    // Tính toán skip cho pagination
    const skip = (page - 1) * limit;

    // Lấy tổng số users theo query
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    // Lấy danh sách users với pagination và sorting
    const users = await User.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    // Lấy thống kê users
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    // Lấy 5 user mới nhất
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    // Render template với dữ liệu
    res.render("pages/admin/user-management", {
      title: "User Management - Admin Dashboard",
      layout: "layouts/admin",
      users: users,
      pagination: {
        page,
        limit,
        totalPages,
        totalUsers,
      },
      filters: {
        search,
        role,
        sort,
        order,
      },
      stats: {
        totalUsers,
        totalAdmins,
        totalCustomers,
        newUsersToday,
      },
      recentUsers,
    });
  } catch (error) {
    console.error("User Management Error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Không thể tải trang quản lý người dùng",
      error: error,
    });
  }
};

// User Details
exports.userDetails = async (req, res) => {
  try {
    const User = require("../models/User");
    const Order = require("../models/Order");

    const userId = req.params.id;

    // Lấy thông tin user
    const user = await User.findById(userId);

    if (!user) {
      req.flash("error_msg", "Không tìm thấy người dùng");
      return res.redirect("/admin/users");
    }

    // Lấy đơn hàng của user
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Tính tổng chi tiêu
    const totalSpent = await Order.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const userStats = {
      totalOrders: await Order.countDocuments({ user: userId }),
      totalSpent: totalSpent.length > 0 ? totalSpent[0].total : 0,
      memberSince: user.createdAt,
      lastLogin: user.lastLogin || user.updatedAt,
    };

    res.render("pages/admin/user-details", {
      title: `User Details: ${user.name} - Admin Dashboard`,
      layout: "layouts/admin",
      user: user,
      orders: orders,
      stats: userStats,
    });
  } catch (error) {
    console.error("User Details Error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Không thể tải thông tin người dùng",
      error: error,
    });
  }
};

// Create User Form
exports.createUserForm = (req, res) => {
  res.render("pages/admin/user-form", {
    title: "Create User - Admin Dashboard",
    layout: "layouts/admin",
    user: {},
    isNew: true,
  });
};

// Edit User Form
exports.editUserForm = async (req, res) => {
  try {
    const User = require("../models/User");
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      req.flash("error_msg", "Không tìm thấy người dùng");
      return res.redirect("/admin/users");
    }

    res.render("pages/admin/user-form", {
      title: `Edit User: ${user.fullName} - Admin Dashboard`,
      layout: "layouts/admin",
      user: user,
      isNew: false,
    });
  } catch (error) {
    console.error("Edit User Form Error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Không thể tải form chỉnh sửa người dùng",
      error: error,
    });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const User = require("../models/User");
    const bcrypt = require("bcryptjs");

    const { name, email, password, role, phone, address } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      req.flash("error_msg", "Email đã được sử dụng");
      return res.redirect("/admin/users/create");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      phone,
      address,
    });

    await newUser.save();

    req.flash("success_msg", "Tạo người dùng thành công");
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Create User Error:", error);
    req.flash("error_msg", "Không thể tạo người dùng");
    res.redirect("/admin/users/create");
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const User = require("../models/User");
    const bcrypt = require("bcryptjs");

    const userId = req.params.id;
    const { fullName, email, password, role, phone, address, status } =
      req.body;

    // Kiểm tra user tồn tại
    const user = await User.findById(userId).select("+password");

    if (!user) {
      req.flash("error_msg", "Không tìm thấy người dùng");
      return res.redirect("/admin/users");
    }

    console.log("Found user:", {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
    });

    // Kiểm tra email đã tồn tại chưa (nếu thay đổi email)
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        req.flash("error_msg", "Email đã được sử dụng");
        return res.redirect(`/admin/users/edit/${userId}`);
      }
    }

    const mappedStatus =
      req.body.status === "inactive" ? "blocked" : req.body.status;

    // Cập nhật thông tin
    user.fullName = fullName;
    user.email = email;
    user.role = role;
    user.phone = phone || "";
    user.status = mappedStatus || "active";

    // Cập nhật password nếu có
    if (password && password.trim() !== "") {
      user.password = password;
    }

    console.log("Updated user (before save):", {
      fullName: user.fullName,
      email: user.email,
      status: user.status,
    });

    await user.save();

    req.flash("success_msg", "Cập nhật người dùng thành công");
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Update User Error:", error);
    req.flash("error_msg", "Không thể cập nhật người dùng");
    res.redirect(`/admin/users/edit/${req.params.id}`);
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const User = require("../models/User");
    const userId = req.params.id;

    // Find user first to verify it exists
    const user = await User.findById(userId);

    if (!user) {
      req.flash("error_msg", "Không tìm thấy người dùng");
      return res.redirect("/admin/users");
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    req.flash("success_msg", "Xóa người dùng thành công");
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Delete User Error:", error);
    req.flash("error_msg", "Không thể xóa người dùng: " + error.message);
    res.redirect("/admin/users");
  }
};

exports.productDashboard = async (req, res) => {
  res.render("pages/admin/product-dashboard", {
    title: "Product Dashboard - Admin",
    layout: "layouts/admin",
    user: req.user,
  });
};

// Create Product Form
exports.addProductForm = async (req, res) => {
  console.log("SOMEONE SEND GET REQUEST TO /admin/products/add-product");
  const categories = await Category.find().populate("attributes");
  res.render("pages/admin/add-product", {
    title: "Add Product - Admin Dashboard",
    categories,
    layout: "layouts/admin",
    product: {},
    isNew: true,
  });
};

exports.addProduct = async (req, res) => {
  try {
    console.log("Received product data:", req.body);

    const {
      name,
      brand,
      description,
      category,
      basePrice,
      discountPercentage,
      quantity,
      status,
      featured,
      imageUrl,
      tags,
    } = req.body;

    const parsedBasePrice = parseFloat(basePrice);
    const parsedPrice = parseFloat(basePrice);
    const parsedDiscountPercentage = discountPercentage
      ? parseFloat(discountPercentage)
      : 0; // default 0;
    const parsedQuantity = parseInt(quantity);
    const isFeatured = featured === "true";
    const parsedTags = tags
      ? tags
          .replace(/"/g, "")
          .split(",")
          .map((t) => t.trim())
      : [];

    const commonSpecs = {
      processor: req.body["commonSpecs[processor]"] || "",
      operatingSystem: req.body["commonSpecs[operatingSystem]"] || "",
      screenSize: req.body["commonSpecs[screenSize]"] || "",
      weight: req.body["commonSpecs[weight]"] || "",
      origin: req.body["commonSpecs[origin]"] || "",
      warrantyInfo: {
        durationInMonths:
          parseInt(req.body["commonSpecs[warrantyInfo][durationInMonths]"]) ||
          0,
        type: req.body["commonSpecs[warrantyInfo][type]"] || "",
        coverage: req.body["commonSpecs[warrantyInfo][coverage]"] || "",
      },
    };

    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];

    const discountPrice =
      parsedDiscountPercentage > 0
        ? parsedPrice - parsedPrice * (parsedDiscountPercentage / 100)
        : parsedPrice;

    const image =
      imageUrl && imageUrl.trim() !== ""
        ? imageUrl
        : "/images/default-product.jpg";

    const newProduct = new Product({
      name,
      description,
      brand,
      category,
      basePrice: parsedBasePrice,
      price: parsedPrice,
      discountPercentage: parsedDiscountPercentage,
      discountPrice,
      commonSpecs,
      variants,
      quantity: parsedQuantity,
      status,
      featured: isFeatured,
      tags: parsedTags,
      imageURL: image,
    });

    await newProduct.save();
    req.flash("success_msg", "Product added successfully!");
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error adding product:", error);
    req.flash("error_msg", "Error adding product");
    res.redirect("/admin/dashboard");
  }
};

exports.deleteProductForm = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.render("pages/admin/delete-product", {
      title: "Delete Product",
      layout: "layouts/admin",
      products,
    });
  } catch (error) {
    console.error("Error loading delete form:", error);
    req.flash("error_msg", "Could not load products for deletion");
    res.redirect("/admin/dashboard");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    console.log("Deleting product with ID:", req.params.id);
    req.flash("success_msg", "Product deleted successfully!");
    res.redirect("/admin/products/delete-product");
  } catch (error) {
    console.error("Error deleting product:", error);
    req.flash("error_msg", "Could not delete product");
    res.redirect("/admin/delete_product");
  }
};

exports.editProductForm = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.render("pages/admin/edit-product", {
      title: "Edit Product",
      layout: "layouts/admin",
      products,
    });
  } catch (error) {
    console.error("Error loading edit form:", error);
    req.flash("error_msg", "Could not load products for edit");
    res.redirect("/admin/dashboard");
  }
};

exports.editOneProductForm = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  const categories = await Category.find(); // for category dropdown

  res.render("pages/admin/edit-one-product", {
    title: "Edit Product",
    layout: "layouts/admin",
    product,
    categories,
  });
};

exports.editOneProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      category,
      basePrice,
      discountPercentage,
      quantity,
      status,
      featured,
      imageURL,
      tags,
    } = req.body;

    const parsedBasePrice = parseFloat(basePrice);
    const parsedPrice = parseFloat(basePrice);
    const parsedDiscountPercentage = parseFloat(discountPercentage);
    const parsedQuantity = parseInt(quantity);
    const isFeatured = featured === "true";
    const parsedTags = tags
      ? tags
          .replace(/"/g, "")
          .split(",")
          .map((t) => t.trim())
      : [];

    const commonSpecs = {
      processor: req.body["commonSpecs[processor]"] || "",
      operatingSystem: req.body["commonSpecs[operatingSystem]"] || "",
      screenSize: req.body["commonSpecs[screenSize]"] || "",
      weight: req.body["commonSpecs[weight]"] || "",
      origin: req.body["commonSpecs[origin]"] || "",
      warrantyInfo: {
        durationInMonths:
          parseInt(req.body["commonSpecs[warrantyInfo][durationInMonths]"]) ||
          0,
        type: req.body["commonSpecs[warrantyInfo][type]"] || "",
        coverage: req.body["commonSpecs[warrantyInfo][coverage]"] || "",
      },
    };

    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];

    const discountPrice =
      parsedDiscountPercentage > 0
        ? parsedPrice - parsedPrice * (parsedDiscountPercentage / 100)
        : parsedPrice;

    const image =
      imageURL && imageURL.trim() !== ""
        ? imageURL
        : "/images/default-product.jpg";

    const updatedProductData = {
      name,
      description,
      brand,
      category,
      basePrice: parsedBasePrice,
      price: parsedPrice,
      discountPercentage: parsedDiscountPercentage,
      discountPrice,
      commonSpecs,
      variants,
      quantity: parsedQuantity,
      status,
      featured: isFeatured,
      tags: parsedTags,
      imageURL: image,
    };

    await Product.findByIdAndUpdate(req.params.id, updatedProductData, {
      new: true,
    });

    req.flash("success_msg", "Product updated successfully!");
    res.redirect("/admin/products/edit-product");
  } catch (error) {
    console.error("Error adding product:", error);
    req.flash("error_msg", "Error adding product");
    res.redirect("/admin/products/edit-product");
  }
};

exports.priceUpdateForm = async (req, res) => {
  try {
    const categories = await Category.find();
    const brands = await Product.distinct("brand");

    res.render("pages/admin/update-price", {
      title: "Batch Price Update",
      layout: "layouts/admin",
      categories,
      brands,
    });
  } catch (error) {
    console.error("Error loading batch price update form:", error);
    req.flash("error_msg", "Cannot load price update form");
    res.redirect("/admin/dashboard");
  }
};

exports.priceUpdate = async (req, res) => {
  try {
    const { mode, category, brand, minQuantity } = req.body;
    const filter = {};

    // Build dynamic filter:
    if (category) filter.category = category;
    if (brand && brand.trim() !== "") filter.brand = brand.trim();
    if (minQuantity && !isNaN(minQuantity))
      filter.quantity = { $gte: parseInt(minQuantity) };

    // --- Mode 1: Update Base Price ---
    if (mode === "basePriceUpdate") {
      const { actionType, adjustValue } = req.body;

      const value = parseFloat(adjustValue);
      if (isNaN(value)) throw new Error("Invalid adjustment value");

      const products = await Product.find(filter);

      // Perform update per document
      const updatePromises = products.map(async (product) => {
        if (actionType === "increasePercentage") {
          product.basePrice += product.basePrice * (value / 100);
          product.price = product.basePrice; // Keep price in sync if no discount
        } else if (actionType === "decreasePercentage") {
          product.basePrice -= product.basePrice * (value / 100);
          product.price = product.basePrice;
        }
        return product.save();
      });

      await Promise.all(updatePromises);

      req.flash("success_msg", "Base prices updated successfully!");
      return res.redirect("/admin/products/update-price");
    }

    // --- Mode 2: Set Discount Percentage ---
    else if (mode === "discountUpdate") {
      const { discountPercentage } = req.body;
      const discountValue = parseFloat(discountPercentage);
      if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
        throw new Error("Invalid discount percentage");
      }

      const products = await Product.find(filter);

      const updatePromises = products.map(async (product) => {
        product.discountPercentage = discountValue;
        // Recalculate discountPrice field:
        product.discountPrice =
          product.basePrice - product.basePrice * (discountValue / 100);
        return product.save();
      });

      await Promise.all(updatePromises);

      req.flash("success_msg", "Discount percentages updated successfully!");
      return res.redirect("/admin/products/update-price");
    } else {
      throw new Error("Invalid mode selected");
    }
  } catch (error) {
    console.error("Error during batch price update:", error);
    req.flash("error_msg", "Error performing batch price update");
    return res.redirect("/admin/dashboard");
  }
};

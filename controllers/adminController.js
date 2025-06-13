// controllers/adminController.js

const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Category = require('../models/Category');
const Review = require('../models/Review');

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
      console.log('Review model not available');
    }

    // 2. SALES STATISTICS
    let salesStats = {
      totalRevenue: 0,
      revenueIncrease: 0,
      totalOrders: 0,
      ordersIncrease: 0,
      newCustomers: 0,
      customersIncrease: 0
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
          createdAt: { $gte: currentMonth }
          // Bỏ status: 'completed' nếu model không có field này
        });
        
        // Tính total revenue
        salesStats.totalRevenue = currentMonthOrders.reduce((sum, order) => {
          return sum + (order.totalAmount || order.total || 0);
        }, 0);
        
        salesStats.totalOrders = currentMonthOrders.length;
        
        // Lấy orders tháng trước
        const lastMonthOrders = await Order.find({
          createdAt: { $gte: lastMonth, $lte: lastMonthEnd }
        });
        
        const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => {
          return sum + (order.totalAmount || order.total || 0);
        }, 0);
        
        // Tính % tăng trưởng
        salesStats.revenueIncrease = lastMonthRevenue > 0 
          ? ((salesStats.totalRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
          : 0;
        
        salesStats.ordersIncrease = lastMonthOrders.length > 0 
          ? ((salesStats.totalOrders - lastMonthOrders.length) / lastMonthOrders.length * 100).toFixed(1)
          : 0;

        // 3. MONTHLY SALES DATA (6 tháng gần nhất)
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        for (let i = 5; i >= 0; i--) {
          const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
          
          const monthOrders = await Order.find({
            createdAt: { $gte: monthStart, $lte: monthEnd }
          });
          
          const monthRevenue = monthOrders.reduce((sum, order) => {
            return sum + (order.totalAmount || order.total || 0);
          }, 0);
          
          monthlySales.push({
            month: monthNames[monthStart.getMonth()],
            total: monthRevenue,
            count: monthOrders.length
          });
        }
      }

      // 4. NEW CUSTOMERS
      salesStats.newCustomers = await User.countDocuments({
        createdAt: { $gte: currentMonth }
      });

      const lastMonthCustomers = await User.countDocuments({
        createdAt: { $gte: lastMonth, $lte: lastMonthEnd }
      });

      salesStats.customersIncrease = lastMonthCustomers > 0 
        ? ((salesStats.newCustomers - lastMonthCustomers) / lastMonthCustomers * 100).toFixed(1)
        : 0;

    } catch (error) {
      console.log('Error calculating sales stats:', error.message);
    }

    // 5. TOP PRODUCTS (từ seeded data)
    try {
      const products = await Product.find()
        .populate('category')
        .sort({ createdAt: -1 })
        .limit(5);
      
      // Tạo mock data dựa trên products thật
      topProducts = products.map((product, index) => ({
        name: product.name,
        totalSold: Math.floor(Math.random() * 100) + 20,
        percentage: Math.floor(Math.random() * 40) + 40
      }));
    } catch (error) {
      console.log('Error getting top products:', error.message);
    }

    // 6. SALES BY CATEGORY
    try {
      const categories = await Category.find();
      const colors = ['#0d6efd', '#198754', '#ffc107', '#dc3545'];
      
      salesByCategory = categories.slice(0, 4).map((category, index) => ({
        name: category.name,
        percentage: Math.floor(Math.random() * 30) + 15,
        color: colors[index]
      }));
    } catch (error) {
      console.log('Error getting sales by category:', error.message);
    }

    // 7. RECENT ACTIVITIES
    try {
      recentActivities = await Product.find()
        .populate('category')
        .sort({ updatedAt: -1 })
        .limit(5);
    } catch (error) {
      console.log('Error getting recent activities:', error.message);
    }

    // Tính max value cho monthly sales chart
    const maxMonthlySales = Math.max(...monthlySales.map(m => m.total), 1);

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
        totalReviews: totalReviews
      }
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Không thể tải dashboard',
      error: error 
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
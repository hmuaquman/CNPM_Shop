// models/Statistics.js
const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  totalCustomers: {
    type: Number,
    default: 0
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  // Thống kê theo tháng
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  // Thống kê chi tiết
  categoryStats: [{
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    categoryName: String,
    revenue: Number,
    orderCount: Number
  }],
  topProducts: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productName: String,
    soldQuantity: Number,
    revenue: Number
  }]
}, {
  timestamps: true
});

// Index để tìm kiếm nhanh theo tháng/năm
statisticsSchema.index({ year: 1, month: 1 });

module.exports = mongoose.model('Statistics', statisticsSchema);
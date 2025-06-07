const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "daily_sales",
      "monthly_revenue",
      "product_performance",
      "user_activity",
      "category_stats",
    ],
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  period: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Tạo các phương thức tĩnh để thu thập thống kê
StatisticSchema.statics.getDailySales = async function (date) {
  // Implement logic to get daily sales statistics
};

StatisticSchema.statics.getMonthlyRevenue = async function (year, month) {
  // Implement logic to get monthly revenue statistics
};

StatisticSchema.statics.getProductPerformance = async function (
  productId,
  startDate,
  endDate
) {
  // Implement logic to get product performance statistics
};

StatisticSchema.statics.getCategoryStats = async function () {
  // Implement logic to get category statistics
};

module.exports = mongoose.model("Statistic", StatisticSchema);

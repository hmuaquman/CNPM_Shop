const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isPurchaseVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo index độc nhất cho mỗi user-product pair
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method để tính rating trung bình
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
        isApproved: true,
      },
    },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  return result.length > 0
    ? { average: result[0].avgRating, count: result[0].numReviews }
    : { average: 0, count: 0 };
};

module.exports = mongoose.model("Review", ReviewSchema);

// reviewController.js

const mongoose = require('mongoose');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order'); // For verifying purchases in the future
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @desc    Add a review for a product
 * @route   POST /reviews/:productId
 * @access  Private (User must be logged in)
 */
const addReview = asyncHandler(async (req, res) => {
  // Đảm bảo lấy đúng productId từ params hoặc body
  const productId = req.params.productId || req.body.productId;
  // Đảm bảo userId lấy đúng từ req.user (đã được middleware auth gán là ObjectId)
  const userId = req.user && req.user._id ? req.user._id : req.user.id;
  const username = req.user && req.user.userName ? req.user.userName : (req.user.username || '');
  const { rating, comment } = req.body;

  // Debug log
  console.log('[Review] Submit:', { userId, username, productId, rating, comment });

  if (!rating || !comment) {
    req.flash('error_msg', 'Vui lòng cung cấp đánh giá và bình luận.');
    return res.redirect(`/products/${productId}`);
  }

  const product = await Product.findById(productId);
  if (!product) {
    req.flash('error_msg', 'Sản phẩm không tồn tại.');
    return res.redirect('/products');
  }

  // Đảm bảo userId và productId đều là ObjectId hợp lệ
  if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    req.flash('error_msg', 'Thông tin người dùng hoặc sản phẩm không hợp lệ.');
    return res.redirect(`/products/${productId}`);
  }

  // Kiểm tra review trùng
  const existingReview = await Review.findOne({ product: productId, user: userId });
  if (existingReview) {
    req.flash('error_msg', 'Bạn đã đánh giá sản phẩm này rồi.');
    return res.redirect(`/products/${productId}`);
  }

  try {
    const review = await Review.create({
      product: productId,
      user: userId,
      username: username,
      rating: Number(rating),
      comment,
      isApproved: true,
    });

    // Sau khi tạo review, luôn populate user
    await review.populate('user', 'fullName userName');

    // Update product rating
    const reviews = await Review.find({ product: productId, isApproved: true });
    const numOfReviews = reviews.length;
    const averageRating = numOfReviews > 0
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews
      : 0;

    await Product.findByIdAndUpdate(productId, {
      rating: averageRating.toFixed(1),
      numOfReviews: numOfReviews
    });

    req.flash('success_msg', 'Đánh giá của bạn đã được ghi nhận!');
    res.redirect(`/products/${productId}`);
  } catch (error) {
    // Nếu bị lỗi duplicate key (trùng user-product), xóa review cũ nếu không hợp lệ (userId null, v.v.)
    if (error.code === 11000) {
      req.flash('error_msg', 'Bạn đã đánh giá sản phẩm này rồi. Nếu bạn gặp lỗi này do dữ liệu cũ, vui lòng liên hệ admin để xóa review cũ.');
    } else if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      req.flash('error_msg', messages.join(', '));
    } else {
      console.error('[Review] Error adding review:', error);
      req.flash('error_msg', 'Không thể gửi đánh giá. Vui lòng thử lại.');
    }
    res.redirect(`/products/${productId}`);
  }
});

/**
 * @desc    Get reviews for a product (approved reviews)
 * @route   GET /reviews/:productId
 * @access  Public
 */
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ product: productId, isApproved: true }).populate('user', 'fullName userName').sort({ createdAt: -1 });
  
  // This controller might be used for an API endpoint.
  // If rendering directly, you'd pass this to a view.
  // For now, let's assume it's for an API or will be used by another controller that renders a page.
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});


// TODO: Add functions for admin to manage reviews (approve, delete)
// e.g., approveReview, deleteReview

module.exports = {
  addReview,
  getProductReviews
};

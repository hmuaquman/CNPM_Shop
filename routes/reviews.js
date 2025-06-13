// reviews.js
const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows us to access params from parent router if this is nested

const {
    addReview,
    getProductReviews
} = require('../controllers/reviewController');

const { protect, authorize } = require('../middlewares/auth');

// Route to add a review for a specific product
// POST /products/:productId/reviews (if nested under product routes)
// POST /reviews/:productId (if standalone)
// For now, assuming standalone or direct usage like /reviews/:productId
router.route('/:productId')
    .post(protect, addReview) // Only logged-in users can add reviews
    .get(getProductReviews); // Anyone can get reviews for a product

// Example of how you might nest it under products.js if preferred:
// In products.js: router.use('/:productId/reviews', reviewRoutes);
// Then in this file, router.route('/').post(protect, addReview).get(getProductReviews);
// And productId would be available via req.params.productId due to mergeParams: true

// TODO: Add routes for admin to manage reviews (e.g., PUT /reviews/:id/approve, DELETE /reviews/:id)
// These would be protected and authorized for admin roles.

module.exports = router;

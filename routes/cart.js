// cart.js
const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
} = require('../controllers/cartController');
const { protect } = require('../middlewares/auth');

// All cart routes are protected
router.use(protect);

router.route('/')
    .get(getCart); // View cart

router.route('/add')
    .post(addToCart); // Add item to cart

router.route('/update/:itemId')
    .post(updateCartItem); // Update item quantity

router.route('/remove/:itemId')
    .post(removeCartItem); // Remove item from cart (using POST for data modification)
    // Alternatively, you could use a GET request for removal if preferred, e.g., router.get('/remove/:itemId', removeCartItem);

module.exports = router;

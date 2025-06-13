// orders.js
const express = require('express');
const router = express.Router();
const {
    getCheckoutPage,
    placeOrder,
    getMyOrders,
    getOrderById
} = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');

// All order routes are protected
router.use(protect);

router.route('/checkout')
    .get(getCheckoutPage); // Display checkout page

router.route('/place')
    .post(placeOrder); // Place a new order

router.route('/myorders')
    .get(getMyOrders); // Get logged in user's orders

router.route('/:id')
    .get(getOrderById); // Get order by ID

module.exports = router;

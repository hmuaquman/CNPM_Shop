// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Kiểm tra xem adminController có đúng không
console.log('Admin controller:', Object.keys(adminController));

// Route cho dashboard - CHỈ DÙNG dashboard
router.get('/dashboard', adminController.dashboard);

module.exports = router;
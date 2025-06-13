// orderController.js

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Display checkout page
// @route   GET /orders/checkout
// @access  Private
const getCheckoutPage = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate({
            path: 'items.product',
            model: 'Product'
        });

    if (!cart || cart.items.length === 0) {
        req.flash('error_msg', 'Giỏ hàng của bạn trống. Không thể tiến hành thanh toán.');
        return res.redirect('/cart');
    }

    // Fetch user details to get addresses
    const user = await User.findById(req.user._id);
    const defaultAddress = user.addresses.find(addr => addr.isDefault) || (user.addresses.length > 0 ? user.addresses[0] : null);

    res.render('pages/orders/checkout', {
        title: 'Thanh toán',
        cart: cart,
        items: cart.items.map(item => {
            let productDetails = item.product;
            let variantDetails = item.variant;
            let name = productDetails.name;
            let image = productDetails.images && productDetails.images.length > 0 ? productDetails.images[0] : '/images/default-product.jpg';
            let price = productDetails.price; // Default to product price
            let variantInfo = {};

            if (variantDetails) {
                name += ` - ${variantDetails.name}`;
                price = variantDetails.price; // Use variant price if available
                image = variantDetails.image || image;
                variantDetails.attributes.forEach(attr => {
                    variantInfo[attr.name.toLowerCase()] = attr.value;
                });
            }
            return {
                _id: item._id, // cart item id
                productId: productDetails._id,
                productSlug: productDetails.slug,
                name: name,
                quantity: item.quantity,
                price: price,
                image: image,
                variantId: variantDetails ? variantDetails._id : null,
                variantInfo: variantInfo
            };
        }),
        totalAmount: cart.totalAmount,
        userAddress: defaultAddress,
        currentUser: user,
        csrfToken: req.csrfToken ? req.csrfToken() : null // If using csurf for CSRF protection
    });
});

// @desc    Place a new order
// @route   POST /orders/place
// @access  Private
const placeOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { 
        fullName, street, city, postalCode, country, phone,
        paymentMethod = 'COD', // Default to Cash on Delivery
        saveAddress // boolean
    } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product').populate('items.variant');

    if (!cart || cart.items.length === 0) {
        req.flash('error_msg', 'Giỏ hàng của bạn trống.');
        return res.redirect('/cart');
    }

    const shippingAddress = {
        fullName: fullName || req.user.fullName,
        street: street,
        city: city,
        postalCode: postalCode,
        country: country,
        phone: phone
    };

    // Validate shipping address fields
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country || !shippingAddress.phone) {
        req.flash('error_msg', 'Vui lòng cung cấp đầy đủ thông tin địa chỉ giao hàng.');
        // Optionally, redirect back to checkout with form data preserved
        return res.redirect('/orders/checkout'); 
    }

    const orderItems = [];
    let orderTotalAmount = 0;

    // Check stock and prepare order items
    for (const item of cart.items) {
        const product = await Product.findById(item.product._id).populate('variants');
        if (!product) {
            req.flash('error_msg', `Sản phẩm với ID ${item.product._id} không tìm thấy.`);
            return res.redirect('/cart');
        }

        let priceOfItem = product.price;
        let stockToUpdate = product.stock; // General product stock
        let variantToUpdate = null;

        if (item.variant) {
            variantToUpdate = product.variants.id(item.variant._id);
            if (!variantToUpdate) {
                req.flash('error_msg', `Phiên bản sản phẩm không tìm thấy cho ${product.name}.`);
                return res.redirect('/cart');
            }
            if (variantToUpdate.stock < item.quantity) {
                req.flash('error_msg', `Không đủ hàng cho ${product.name} - ${variantToUpdate.name}. Chỉ còn ${variantToUpdate.stock}.`);
                return res.redirect('/cart');
            }
            priceOfItem = variantToUpdate.price;
            stockToUpdate = variantToUpdate.stock; // Variant specific stock
        } else {
            if (product.stock < item.quantity) {
                req.flash('error_msg', `Không đủ hàng cho ${product.name}. Chỉ còn ${product.stock}.`);
                return res.redirect('/cart');
            }
        }
        
        orderItems.push({
            product: product._id,
            variant: item.variant ? item.variant._id : null,
            name: item.variant ? `${product.name} - ${variantToUpdate.name}` : product.name,
            quantity: item.quantity,
            price: priceOfItem,
            image: item.variant && variantToUpdate.image ? variantToUpdate.image : (product.images && product.images.length > 0 ? product.images[0] : '/images/default-product.jpg')
        });
        orderTotalAmount += item.quantity * priceOfItem;
    }

    // Create new order
    const order = new Order({
        user: userId,
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalAmount: orderTotalAmount, // Recalculate based on current prices to be safe
        // Other fields like shippingPrice, taxPrice can be added if needed
    });

    const createdOrder = await order.save();

    // Update stock levels
    for (const item of createdOrder.orderItems) {
        const product = await Product.findById(item.product).populate('variants');
        if (item.variant) {
            const variant = product.variants.id(item.variant);
            variant.stock -= item.quantity;
        } else {
            product.stock -= item.quantity;
        }
        await product.save();
    }

    // Clear the cart
    await Cart.findOneAndDelete({ user: userId });

    // Optionally save address to user profile
    if (saveAddress === 'on' || saveAddress === true) {
        const user = await User.findById(userId);
        // Prevent duplicate addresses if logic is simple; for more complex, check existing addresses
        const addressExists = user.addresses.some(addr => 
            addr.street === shippingAddress.street && 
            addr.city === shippingAddress.city && 
            addr.postalCode === shippingAddress.postalCode &&
            addr.country === shippingAddress.country
        );
        if (!addressExists) {
            if (user.addresses.length === 0) shippingAddress.isDefault = true; // Make first saved address default
            user.addresses.push(shippingAddress);
            await user.save();
        }
    }

    req.flash('success_msg', 'Đặt hàng thành công!');
    res.redirect(`/orders/${createdOrder._id}`); // Redirect to order details page
});

// @desc    Get logged in user orders
// @route   GET /orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.render('pages/orders/myOrders', {
        title: 'Đơn hàng của tôi',
        orders: orders
    });
});

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'fullName email').populate({
        path: 'orderItems.product',
        model: 'Product'
    }).populate({
        path: 'orderItems.variant',
        model: 'ProductVariant'
    });

    if (order && (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin')) {
        res.render('pages/orders/orderDetails', {
            title: `Chi tiết đơn hàng ${order._id}`,
            order: order
        });
    } else {
        req.flash('error_msg', 'Không tìm thấy đơn hàng hoặc bạn không có quyền truy cập.');
        res.redirect('/orders/myorders');
    }
});


module.exports = {
    getCheckoutPage,
    placeOrder,
    getMyOrders,
    getOrderById
};

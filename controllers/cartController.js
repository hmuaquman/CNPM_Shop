const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { formatPrice } = require('../utils/helpers');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get user cart
// @route   GET /cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
        path: 'items.product',
        model: 'Product'
    });

    let totalPrice = 0;
    if (cart && cart.items) {
        cart.items.forEach(item => {
            if (item.product) { // Make sure product is not null
                totalPrice += item.quantity * item.product.price;
            }
        });
    }

    res.render('pages/cart/index', {
        title: 'Giỏ hàng',
        user: req.user,
        cart: cart,
        totalPrice,
        formatPrice,
    });
});

// @desc    Add item to cart
// @route   POST /cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, variantId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!product) {
        req.flash('error', 'Không tìm thấy sản phẩm.');
        return res.redirect('back');
    }

    let name = product.name;
    let price = product.price;
    let image = product.imageURL;
    let variantInfo = undefined;
    let usedVariantId = undefined;

    // Nếu có variantId, lấy thông tin variant
    if (variantId && product.variants && product.variants.length > 0) {
        const variant = product.variants.id(variantId) || product.variants.find(v => v._id.toString() === variantId);
        if (variant) {
            price = variant.price;
            usedVariantId = variant._id;
            // Lấy thông tin các thuộc tính biến thể nếu có
            variantInfo = {};
            if (variant.attributes) {
                if (Array.isArray(variant.attributes)) {
                    variant.attributes.forEach(attr => {
                        if (attr.name && attr.value) {
                            variantInfo[attr.name] = attr.value;
                        }
                    });
                } else {
                    Object.assign(variantInfo, variant.attributes);
                }
            }
            // Nếu variant có hình riêng
            if (variant.images && variant.images.length > 0) {
                image = variant.images[0];
            }
        }
    }

    // Tạo object item đầy đủ
    const newItem = {
        product: productId,
        quantity: parseInt(quantity, 10),
        name,
        price,
        image,
        variantId: usedVariantId,
        variantInfo
    };

    if (cart) {
        // Nếu đã có sản phẩm này (và đúng variant), thì cộng dồn số lượng
        let itemIndex = cart.items.findIndex(p => p.product.toString() === productId && (usedVariantId ? p.variantId === usedVariantId.toString() : !p.variantId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += parseInt(quantity, 10);
        } else {
            cart.items.push(newItem);
        }
        await cart.save();
    } else {
        await Cart.create({
            user: userId,
            items: [newItem]
        });
    }
    req.flash('success', 'Sản phẩm đã được thêm vào giỏ hàng!');
    return res.redirect('/cart');
});

// @desc    Update cart item quantity
// @route   POST /cart/update/:itemId
// @access  Private
// @desc    Update cart item quantity
// @route   POST /cart/update/:itemId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity, variantId } = req.body;
    const { itemId } = req.params; // This is the product ID
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
        // Tìm item đúng với cả productId và variantId (nếu có)
        let itemIndex = cart.items.findIndex(
            p => p.product.toString() === itemId && (variantId ? (p.variantId && p.variantId.toString() === variantId) : !p.variantId)
        );
        if (itemIndex > -1) {
            if (parseInt(quantity, 10) > 0) {
                cart.items[itemIndex].quantity = parseInt(quantity, 10);
            } else {
                // Nếu quantity <= 0 thì xóa khỏi giỏ
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            req.flash('success', 'Giỏ hàng đã được cập nhật.');
        } else {
            req.flash('error', 'Không tìm thấy sản phẩm trong giỏ hàng.');
        }
    } else {
        req.flash('error', 'Không tìm thấy giỏ hàng.');
    }
    return res.redirect('/cart');
});

// @desc    Remove item from cart
// @route   POST /cart/remove/:itemId
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params; // This is the product ID
    const { variantId } = req.body; // hoặc req.query nếu truyền qua URL
    const userId = req.user._id;

    let pullQuery = { product: itemId };
    if (variantId) pullQuery.variantId = variantId;

    await Cart.updateOne(
        { user: userId },
        { $pull: { items: pullQuery } }
    );
    req.flash('success', 'Sản phẩm đã được xóa khỏi giỏ hàng.');
    return res.redirect('/cart');
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};

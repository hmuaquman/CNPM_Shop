// orderController.js

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Display checkout page
// @route   GET /orders/checkout
// @access  Private
const getCheckoutPage = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.product",
    model: "Product",
  });

  if (!cart || cart.items.length === 0) {
    req.flash(
      "error_msg",
      "Giỏ hàng của bạn trống. Không thể tiến hành thanh toán."
    );
    return res.redirect("/cart");
  }

  // Fetch user details to get addresses
  const user = await User.findById(req.user._id);
  const defaultAddress =
    user.addresses.find((addr) => addr.isDefault) ||
    (user.addresses.length > 0 ? user.addresses[0] : null);

  res.render("pages/orders/checkout", {
    title: "Thanh toán",
    cart: cart,
    // Xử lý items phù hợp với cấu trúc của bạn
    items: cart.items.map((item) => {
      let productDetails = item.product;
      let name = productDetails.name;
      let image = item.image;
      let price = productDetails.price || item.price; // Lấy giá từ item.price nếu có
      let variantInfo = item.variantInfo || {}; // Sử dụng variantInfo đã có

      // Đảm bảo trả về đúng cấu trúc dữ liệu
      return {
        _id: item._id,
        productId: productDetails._id,
        productSlug: productDetails.slug,
        name: name,
        quantity: item.quantity,
        price: price,
        image: image,
        variantId: item.variantId || null,
        variantInfo: variantInfo,
      };
    }),
    totalAmount: cart.totalAmount,
    userAddress: defaultAddress,
    currentUser: user,
    csrfToken: req.csrfToken ? req.csrfToken() : null,
    formatPrice: (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      }).format(price);
    },
  });
});

// @desc    Place a new order
// @route   POST /orders/place
// @access  Private
const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { paymentMethod = "cod" } = req.body;

  // Lấy giỏ hàng nhưng không cần populate product
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    req.flash("error_msg", "Giỏ hàng của bạn trống.");
    return res.redirect("/cart");
  }

  // Lấy địa chỉ mặc định từ user
  const user = await User.findById(userId);
  if (!user.addresses || user.addresses.length === 0) {
    req.flash(
      "error_msg",
      "Bạn cần cập nhật địa chỉ giao hàng trước khi đặt hàng."
    );
    return res.redirect("/user/profile");
  }

  // Lấy địa chỉ mặc định hoặc địa chỉ đầu tiên
  const defaultAddress =
    user.addresses.find((addr) => addr.isDefault) || user.addresses[0];

  // Sử dụng cấu trúc shippingAddress từ schema
  const shippingAddress = {
    recipientName: defaultAddress.recipientName || user.fullName,
    recipientPhone: defaultAddress.recipientPhone || user.phone,
    streetAndNumber: defaultAddress.streetAndNumber || "",
    ward: defaultAddress.ward || "",
    district: defaultAddress.district || "",
    city: defaultAddress.city || "",
  };

  // Tạo đơn hàng theo cấu trúc của Order schema
  const orderItems = [];
  let itemsAmount = 0;

  // Chuyển đổi từ cart items sang order items
  // Sử dụng Promise.all để đợi tất cả các truy vấn product hoàn tất
  await Promise.all(
    cart.items.map(async (item) => {
      // Truy vấn trực tiếp đến sản phẩm bằng ID
      const product = await Product.findById(item.product);
      if (!product) {
        console.error(`Không tìm thấy sản phẩm với ID ${item.product}`);
        return; // Skip this item
      }

      // Lấy ảnh từ sản phẩm
      console.log(`Truy vấn sản phẩm: ${product.name}`);
      console.log(`Ảnh sản phẩm: ${product.imageURL}`);

      console.log(
        `Sản phẩm ${product.name} - sử dụng ảnh: ${product.imageURL}`
      );

      const orderItem = {
        product: product._id,
        variantId: item.variantId || null,
        name: product.name,
        price: item.price,
        quantity: item.quantity,
        image: product.imageURL, // Sử dụng ảnh đã truy vấn từ sản phẩm
        variantInfo: item.variantInfo || {},
      };

      orderItems.push(orderItem);
      itemsAmount += item.price * item.quantity;
    })
  );

  // Tính phí vận chuyển
  const shippingFee = itemsAmount >= 1000000 ? 0 : 30000; // Miễn phí vận chuyển cho đơn hàng ≥ 1tr

  // Tạo đơn hàng mới theo cấu trúc Order schema
  try {
    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress: shippingAddress,
      shippingInfo: {
        provider: "GHTK",
        trackingCode: "PENDING-" + Math.floor(100000 + Math.random() * 900000),
        shippingFee: shippingFee,
        estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      itemsAmount: itemsAmount,
      totalAmount: itemsAmount + shippingFee,
      paymentMethod: paymentMethod,
      status: "Processing",
      paymentStatus: "pending",
    });

    const createdOrder = await order.save();
    console.log("Đã tạo đơn hàng thành công với ID:", createdOrder._id);

    // Xóa giỏ hàng
    await Cart.findOneAndDelete({ user: userId });

    req.flash("success_msg", "Đặt hàng thành công!");
    res.redirect("/user/orders");
  } catch (error) {
    console.error("Lỗi khi đặt hàng:", error);
    req.flash("error_msg", error.message || "Có lỗi xảy ra khi đặt hàng");
    res.redirect("/cart");
  }
});

// @desc    Get logged in user orders
// @route   GET /orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Thay đổi query để populate product
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product") // Populate sản phẩm để lấy ảnh
    .sort({ createdAt: -1 });

  const formattedOrders = orders.map((order) => {
    const formattedOrder = order.toObject();

    // Đảm bảo items có ảnh
    if (formattedOrder.items) {
      formattedOrder.items = formattedOrder.items.map((item) => {
        // Nếu item không có ảnh, thêm ảnh từ sản phẩm hoặc mặc định
        if (!item.image) {
          if (item.product && item.product.imageURL) {
            item.image = item.product.imageURL;
          }
        }
        return item;
      });
    }

    // Nếu order có items nhưng không có orderItems
    if (formattedOrder.items && !formattedOrder.orderItems) {
      formattedOrder.orderItems = formattedOrder.items;
    }

    // Đảm bảo trạng thái viết thường để khớp với template
    if (formattedOrder.status) {
      formattedOrder.status = formattedOrder.status.toLowerCase();
    }

    return formattedOrder;
  });

  // Ghi log để debug
  console.log(
    "Đơn hàng đầu tiên sau khi xử lý:",
    formattedOrders.length > 0
      ? {
          id: formattedOrders[0]._id,
          items: formattedOrders[0].items.map((item) => ({
            name: item.name,
            image: item.image,
          })),
        }
      : "Không có đơn hàng"
  );

  res.render("pages/user/orders", {
    title: "Đơn hàng của tôi",
    orders: formattedOrders,
    formatPrice: (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      }).format(price);
    },
    page: parseInt(req.query.page) || 1,
    pages: Math.ceil(orders.length / 10), // Giả sử 10 đơn hàng mỗi trang
  });
});

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Bỏ populate items.variant vì không có trong schema
  const order = await Order.findById(req.params.id)
    .populate("user", "fullName email")
    .populate({
      path: "items.product",
      model: "Product",
    });
  // Bỏ dòng populate items.variant

  if (
    order &&
    (order.user._id.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    res.render("pages/orders/orderDetails", {
      title: `Chi tiết đơn hàng ${order._id}`,
      order: order,
    });
  } else {
    req.flash(
      "error_msg",
      "Không tìm thấy đơn hàng hoặc bạn không có quyền truy cập."
    );
    res.redirect("/user/orders");
  }
});

module.exports = {
  getCheckoutPage,
  placeOrder,
  getMyOrders,
  getOrderById,
};

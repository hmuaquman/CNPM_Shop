const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { formatPrice } = require("../utils/helpers");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Get user cart
// @route   GET /cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  console.log("===== DEBUG GET CART =====");
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.product",
    model: "Product",
    select: "name price imageURL variants",
  });

  console.log("Tìm được giỏ hàng:", cart ? "Có" : "Không");

  if (cart) {
    console.log("Số lượng sản phẩm trong giỏ:", cart.items.length);
    // Debug thông tin giỏ hàng
    cart.items.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item.name);
      console.log(`  - Quantity:`, item.quantity);
      console.log(`  - Price:`, item.price);
      console.log(`  - VariantId:`, item.variantId || "Không có");
      console.log(
        `  - VariantInfo:`,
        item.variantInfo ? JSON.stringify(item.variantInfo) : "Không có"
      );
    });
  }

  let totalPrice = 0;
  if (cart && cart.items) {
    cart.items.forEach((item) => {
      totalPrice += item.quantity * item.price;

      // Đảm bảo item có variantInfo
      if (!item.variantInfo) {
        console.log(
          `Sản phẩm "${item.name}" không có variantInfo, thêm mặc định`
        );
        item.variantInfo = {
          color: "Tiêu chuẩn",
          storage: "Mặc định",
          ram: "Mặc định",
        };
      }
    });
  }

  console.log("Tổng giá:", totalPrice);

  res.render("pages/cart/index", {
    title: "Giỏ hàng",
    user: req.user,
    cart: cart || { items: [] },
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
  const isAjax =
    req.xhr ||
    (req.headers && req.headers["x-requested-with"] === "XMLHttpRequest");

  console.log("===== DEBUG ADD TO CART =====");
  console.log("Product ID:", productId);
  console.log("Variant ID:", variantId);
  console.log("Quantity:", quantity);

  let cart = await Cart.findOne({ user: userId });
  const product = await Product.findById(productId);

  if (!product) {
    console.log("Không tìm thấy sản phẩm:", productId);
    if (isAjax) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm." });
    } else {
      req.flash("error", "Không tìm thấy sản phẩm.");
      return res.redirect("/products");
    }
  }

  console.log("Tìm thấy sản phẩm:", product.name);

  let name = product.name;
  let price = product.price;
  let image = product.imageURL;
  let variantInfo = {
    color: "Tiêu chuẩn",
    storage: "Mặc định",
    ram: "Mặc định",
  };
  let usedVariantId = variantId;

  // Xử lý variant - đây là phần cần sửa
  if (product.variants && product.variants.length > 0) {
    let variant;

    // Nếu có variantId, tìm variant đó
    if (variantId) {
      variant = product.variants.id(variantId);
      console.log(
        "Tìm variant theo ID:",
        variantId,
        variant ? "Tìm thấy" : "Không tìm thấy"
      );
    }

    // Nếu không có variantId hoặc không tìm thấy, dùng variant mặc định
    if (!variant) {
      // Tìm variant có isDefault = true
      variant = product.variants.find((v) => v.isDefault === true);

      // Nếu không có variant mặc định, dùng variant đầu tiên
      if (!variant && product.variants.length > 0) {
        variant = product.variants[0];
      }

      if (variant) {
        usedVariantId = variant._id.toString();
        console.log("Sử dụng variant mặc định/đầu tiên:", usedVariantId);
      }
    }

    // Nếu tìm được variant, lấy thông tin
    if (variant) {
      price = variant.price || price;
      console.log("Giá variant:", price);

      // Lấy thông tin thuộc tính từ variant
      if (variant.attributes) {
        console.log("Thuộc tính variant:", JSON.stringify(variant.attributes));

        // Cập nhật variantInfo từ attributes của variant
        if (variant.attributes.color)
          variantInfo.color = variant.attributes.color;
        if (variant.attributes.storage)
          variantInfo.storage = variant.attributes.storage;
        if (variant.attributes.ram) variantInfo.ram = variant.attributes.ram;
      }

      // Kiểm tra hình ảnh variant
      if (variant.images && variant.images.length > 0) {
        image = variant.images[0];
      }
    }
  }

  console.log("Thông tin variantInfo cuối cùng:", JSON.stringify(variantInfo));

  // Xử lý thêm vào giỏ hàng
  if (!cart) {
    // Tạo giỏ hàng mới
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          name,
          price,
          quantity: parseInt(quantity, 10),
          image,
          variantId: usedVariantId,
          variantInfo,
        },
      ],
    });

    if (isAjax) {
      return res.status(200).json({
        success: true,
        message: "Sản phẩm đã được thêm vào giỏ hàng.",
        cartCount: 1,
      });
    } else {
      req.flash("success", "Sản phẩm đã được thêm vào giỏ hàng.");
      return res.redirect("/products");
    }
  }

  // Tìm sản phẩm trong giỏ hàng
  const itemIndex = cart.items.findIndex(
    (item) =>
      item.product.toString() === productId.toString() &&
      (usedVariantId ? item.variantId === usedVariantId : !item.variantId)
  );

  console.log(
    "Sản phẩm trong giỏ hàng:",
    itemIndex > -1 ? "Đã tồn tại" : "Chưa có"
  );

  if (itemIndex > -1) {
    // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
    cart.items[itemIndex].quantity += parseInt(quantity, 10);
    console.log("Cập nhật số lượng:", cart.items[itemIndex].quantity);
  } else {
    // Thêm sản phẩm mới vào giỏ
    cart.items.push({
      product: productId,
      name,
      price,
      quantity: parseInt(quantity, 10),
      image,
      variantId: usedVariantId,
      variantInfo,
    });
    console.log("Thêm sản phẩm mới vào giỏ");
  }

  await cart.save();

  // Trả về phản hồi AJAX hoặc chuyển hướng tùy theo loại request
  if (isAjax) {
    return res.status(200).json({
      success: true,
      message: "Sản phẩm đã được thêm vào giỏ hàng.",
      cartCount: cart.items.length,
    });
  } else {
    req.flash("success", "Sản phẩm đã được thêm vào giỏ hàng.");
    return res.redirect("/products");
  }
});

// @desc    Update cart item quantity
// @route   POST /cart/update/:itemId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity, variantId } = req.body;
  const { itemId } = req.params; // This is the product ID
  const userId = req.user._id;
  const isAjax =
    req.xhr ||
    (req.headers && req.headers["x-requested-with"] === "XMLHttpRequest");

  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    // Tìm item đúng với cả productId và variantId (nếu có)
    let itemIndex = cart.items.findIndex(
      (p) =>
        p.product.toString() === itemId &&
        (variantId
          ? p.variantId && p.variantId.toString() === variantId
          : !p.variantId)
    );

    if (itemIndex > -1) {
      if (parseInt(quantity, 10) > 0) {
        cart.items[itemIndex].quantity = parseInt(quantity, 10);
      } else {
        // Nếu quantity <= 0 thì xóa khỏi giỏ
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();

      // Recalculate total price
      let totalPrice = 0;
      cart.items.forEach((item) => {
        if (item.product) {
          totalPrice += item.quantity * (item.price || item.product.price);
        }
      });

      if (isAjax) {
        return res.status(200).json({
          success: true,
          message: "Cart updated",
          totalPrice: formatPrice(totalPrice),
        });
      } else {
        req.flash("success", "Giỏ hàng đã được cập nhật.");
        return res.redirect("/cart");
      }
    } else {
      if (isAjax) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm trong giỏ hàng.",
        });
      } else {
        req.flash("error", "Không tìm thấy sản phẩm trong giỏ hàng.");
        return res.redirect("/cart");
      }
    }
  } else {
    if (isAjax) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng.",
      });
    } else {
      req.flash("error", "Không tìm thấy giỏ hàng.");
      return res.redirect("/cart");
    }
  }
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

  await Cart.updateOne({ user: userId }, { $pull: { items: pullQuery } });
  req.flash("success", "Sản phẩm đã được xóa khỏi giỏ hàng.");
  return res.redirect("/cart");
});

const updateCartVariantInfo = asyncHandler(async (req, res) => {
  // Chỉ cho admin sử dụng chức năng này
  if (req.user.role !== "admin") {
    req.flash("error", "Bạn không có quyền thực hiện thao tác này");
    return res.redirect("/cart");
  }

  const carts = await Cart.find({});
  let updatedCount = 0;

  for (const cart of carts) {
    let cartModified = false;

    for (const item of cart.items) {
      // Nếu không có variantInfo, thêm vào
      if (!item.variantInfo) {
        item.variantInfo = {
          color: "Tiêu chuẩn",
          storage: "Mặc định",
          ram: "Mặc định",
        };
        cartModified = true;
      }
    }

    if (cartModified) {
      await cart.save();
      updatedCount++;
    }
  }

  req.flash(
    "success",
    `Đã cập nhật ${updatedCount} giỏ hàng với thông tin biến thể.`
  );
  return res.redirect("/cart");
});
module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  updateCartVariantInfo,
};

const mongoose = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: [true, "Vui lòng nhập tên người nhận"],
    maxlength: 100,
  },
  recipientPhone: {
    type: String,
    required: [true, "Vui lòng nhập số điện thoại người nhận"],
    match: [/^(\+84|0)[0-9]{9}$/, "Số điện thoại không hợp lệ"],
  },
  streetAndNumber: {
    type: String,
    required: [true, "Vui lòng nhập địa chỉ đường/phố và số nhà"],
    minlength: 5,
    maxlength: 200,
  },
  ward: {
    type: String,
    required: [true, "Vui lòng nhập phường/xã"],
    maxlength: 100,
  },
  district: {
    type: String,
    required: [true, "Vui lòng nhập quận/huyện"],
    maxlength: 100,
  },
  city: {
    type: String,
    required: [true, "Vui lòng nhập tỉnh/thành phố"],
    maxlength: 100,
  },
  fullAddress: String,
});

const ShippingInfoSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["GHTK", "GHN", "ViettelPost", "GrabExpress", "J&T", "Best Express"],
  },
  trackingCode: String,
  shippingFee: {
    type: Number,
    min: 0,
  },
  estimatedDeliveryDate: Date,
  actualDeliveryDate: Date,
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: String,
        name: String,
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        variantInfo: {
          color: String,
          storage: String,
          ram: String,
        },
      },
    ],
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    shippingInfo: ShippingInfoSchema,
    itemsAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "cod",
        "bank_transfer",
        "vnpay_qr",
        "momo",
        "zalo_pay",
        "shopee_pay",
        "credit_card",
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Tính toán giá trị trước khi lưu
OrderSchema.pre("save", function (next) {
  if (this.isNew) {
    // Tính tổng tiền sản phẩm
    this.itemsAmount = this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Nếu có phí vận chuyển, thêm vào tổng
    const shippingFee =
      this.shippingInfo && this.shippingInfo.shippingFee
        ? this.shippingInfo.shippingFee
        : 0;
    this.totalAmount = this.itemsAmount + shippingFee;

    // Tạo địa chỉ đầy đủ
    if (this.shippingAddress) {
      this.shippingAddress.fullAddress = `${this.shippingAddress.streetAndNumber}, ${this.shippingAddress.ward}, ${this.shippingAddress.district}, ${this.shippingAddress.city}`;
    }
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);

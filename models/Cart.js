const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
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
        variantId: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        name: {
          type: String,
          required: true,
        },
        variantInfo: {
          color: String,
          storage: String,
          ram: String,
        },
        image: String,
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Tính tổng tiền giỏ hàng trước khi lưu
CartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  next();
});

module.exports = mongoose.model("Cart", CartSchema);

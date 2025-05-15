// filepath: j:\Study\CNPMShop\current\FE\cnpmshop\models\Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
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
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    payment: {
      method: {
        type: String,
        enum: ["COD", "Bank Transfer", "Credit Card", "Momo"],
        default: "COD",
      },
      date: Date,
      amount: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);

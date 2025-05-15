const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm"],
      min: 0,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Vui lòng chọn danh mục sản phẩm"],
    },
    imageURL: {
      type: String,
      default: "/images/default-product.jpg",
    },
    attributeValues: [
      {
        attribute: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);

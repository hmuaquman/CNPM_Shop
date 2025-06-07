const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên danh mục"],
      unique: true,
      trim: true,
      maxlength: [100, "Tên danh mục không được vượt quá 100 ký tự"],
    },
    description: {
      type: String,
      maxlength: [500, "Mô tả không được vượt quá 500 ký tự"],
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);

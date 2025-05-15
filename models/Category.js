const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên danh mục"],
      unique: true,
      trim: true,
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

const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên thuộc tính"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attribute", AttributeSchema);

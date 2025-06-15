const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
      maxlength: [200, "Tên sản phẩm không được vượt quá 200 ký tự"],
    },
    description: {
      type: String,
      maxlength: [1000, "Mô tả sản phẩm không được vượt quá 1000 ký tự"],
    },
    brand: {
      type: String,
      required: [true, "Vui lòng nhập thương hiệu"],
      maxlength: [100, "Thương hiệu không được vượt quá 100 ký tự"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Vui lòng chọn danh mục sản phẩm"],
    },
    basePrice: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm"],
      min: [0, "Giá sản phẩm không được âm"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "Phần trăm giảm giá không được âm"],
      max: [100, "Phần trăm giảm giá không được vượt quá 100%"],
      default: 0,
    },
    discountPrice: {
      type: Number,
      min: [0, "Giá giảm không được âm"],
    },
    discountStartDate: Date,
    discountEndDate: Date,
    commonSpecs: {
      processor: String,
      operatingSystem: String,
      screenSize: String,
      weight: String,
      origin: {
        type: String,
        enum: [
          "Chính hãng",
          "Hàng xách tay",
          "Sản xuất tại Việt Nam",
          "Nhập khẩu",
        ],
        default: "Chính hãng",
      },
      warrantyInfo: {
        durationInMonths: {
          type: Number,
          min: 0,
          max: 120,
        },
        type: {
          type: String,
          enum: [
            "Bảo hành tại hãng",
            "Bảo hành tại cửa hàng",
            "Bảo hành quốc tế",
            "Không bảo hành",
          ],
          default: "Không bảo hành",
        },
        coverage: String,
      },
    },
    images: {
      main: [String],
      gallery: [String],
    },
    variants: [
      {
        sku: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
        },
        attributes: {
          color: String,
          storage: String,
          ram: String,
          displaySize: String,
          connectivity: String,
        },
        images: [String],
        status: {
          type: String,
          enum: ["active", "inactive", "discontinued"],
          default: "active",
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    attributeValues: [
      {
        attribute: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
        value: String,
      },
    ],
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageURL: {
      type: String,
      default: "/images/default-product.jpg",
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Cập nhật giá sau khi áp dụng khuyến mãi
ProductSchema.pre("save", function (next) {
  // Nếu có khuyến mãi và đang trong thời gian khuyến mãi
  if (this.discountPercentage > 0) {
    const now = new Date();
    const startDate = this.discountStartDate
      ? new Date(this.discountStartDate)
      : null;
    const endDate = this.discountEndDate
      ? new Date(this.discountEndDate)
      : null;

    // Nếu đang trong thời gian khuyến mãi hoặc không có ngày bắt đầu/kết thúc
    if ((!startDate || now >= startDate) && (!endDate || now <= endDate)) {
      this.discountPrice = this.basePrice * (1 - this.discountPercentage / 100);
      this.price = this.discountPrice;
    } else {
      this.price = this.basePrice;
    }
  } else {
    this.price = this.basePrice;
  }

  next();
});

module.exports = mongoose.model("Product", ProductSchema);

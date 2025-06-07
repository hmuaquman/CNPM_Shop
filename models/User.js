const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 100,
    },
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
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Vui lòng nhập họ tên"],
      minlength: 3,
      maxlength: 50,
    },
    userName: {
      type: String,
      required: [true, "Vui lòng nhập tên người dùng"],
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không hợp lệ",
      ],
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
      select: false, // Không trả về mật khẩu khi query
    },
    phone: {
      type: String,
      match: [/^(\+84|0)[0-9]{9}$/, "Số điện thoại không hợp lệ"],
    },
    addresses: [AddressSchema],
    role: {
      type: String,
      enum: ["guest", "customer", "admin"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Mã hóa mật khẩu trước khi lưu
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Phương thức kiểm tra mật khẩu
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

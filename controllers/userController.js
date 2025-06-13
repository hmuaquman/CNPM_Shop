const User = require("../models/User");

// Hiển thị thông tin tài khoản
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.render("pages/user/profile", {
      title: "Thông tin tài khoản",
      layout: "layouts/main",
      user,
    });
  } catch (error) {
    console.error("Error loading profile:", error);
    req.flash("error_msg", "Có lỗi xảy ra khi tải thông tin tài khoản");
    res.redirect("/");
  }
};

// Cập nhật thông tin tài khoản
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      fullName,
      phone,
      email,
    });

    req.flash("success_msg", "Cập nhật thông tin thành công!");
    res.redirect("/user/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    req.flash("error_msg", "Có lỗi xảy ra khi cập nhật thông tin");
    res.redirect("/user/profile");
  }
};

// Cập nhật địa chỉ giao hàng
exports.updateAddress = async (req, res) => {
  try {
    const {
      recipientName,
      recipientPhone,
      streetAndNumber,
      ward,
      district,
      city,
    } = req.body;

    const user = await User.findById(req.user._id);

    // Cập nhật địa chỉ đầu tiên hoặc tạo mới nếu chưa có
    if (user.addresses && user.addresses.length > 0) {
      // Update địa chỉ hiện tại
      user.addresses[0] = {
        name: "Địa chỉ chính",
        recipientName,
        recipientPhone,
        streetAndNumber,
        ward,
        district,
        city,
        isDefault: true,
      };
    } else {
      // Tạo địa chỉ mới nếu chưa có
      user.addresses = [
        {
          name: "Địa chỉ chính",
          recipientName,
          recipientPhone,
          streetAndNumber,
          ward,
          district,
          city,
          isDefault: true,
        },
      ];
    }

    await user.save();

    req.flash("success_msg", "Cập nhật địa chỉ giao hàng thành công!");
    res.redirect("/user/profile");
  } catch (error) {
    console.error("Error updating address:", error);
    req.flash("error_msg", "Có lỗi xảy ra khi cập nhật địa chỉ");
    res.redirect("/user/profile");
  }
};

// Hiển thị lịch sử mua hàng đơn giản
exports.getOrderHistory = async (req, res) => {
  try {
    res.render("pages/user/orders", {
      title: "Lịch sử mua hàng",
      layout: "layouts/main",
      orders: [],
    });
  } catch (error) {
    console.error("Error loading orders:", error);
    req.flash("error_msg", "Có lỗi xảy ra khi tải lịch sử mua hàng");
    res.redirect("/");
  }
};

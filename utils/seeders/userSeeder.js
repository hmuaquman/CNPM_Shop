const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const usersData = [
  {
    fullName: "Admin User",
    userName: "admin",
    email: "admin@example.com",
    password: "admin123", // Để nguyên password thô
    phone: "0901234567",
    addresses: [
      {
        name: "Văn phòng",
        recipientName: "Admin User",
        recipientPhone: "0901234567",
        streetAndNumber: "285 Đội Cấn",
        ward: "Phường Liễu Giai",
        district: "Quận Ba Đình",
        city: "Hà Nội",
        isDefault: true,
      },
    ],
    role: "admin",
    status: "active",
  },
  {
    fullName: "Nguyễn Văn A",
    userName: "nguyenvana",
    email: "nguyenvana@example.com",
    password: "password123", // Để nguyên password thô
    phone: "0912345678",
    addresses: [
      {
        name: "Nhà riêng",
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
        isDefault: true,
      },
      {
        name: "Cơ quan",
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
        isDefault: false,
      },
    ],
    role: "customer",
    status: "active",
  },
  {
    fullName: "Trần Thị B",
    userName: "tranthib",
    email: "tranthib@example.com",
    password: "password123", // Để nguyên password thô
    phone: "0978123456",
    addresses: [
      {
        name: "Nhà riêng",
        recipientName: "Trần Thị B",
        recipientPhone: "0978123456",
        streetAndNumber: "789 Trần Hưng Đạo",
        ward: "Phường Cầu Ông Lãnh",
        district: "Quận 1",
        city: "Hồ Chí Minh",
        isDefault: true,
      },
    ],
    role: "customer",
    status: "active",
  },
];

const seedUsers = async () => {
  try {
    console.log("Đang xóa tài khoản cũ...");
    await User.deleteMany({});

    console.log("Đang tạo tài khoản người dùng...");

    // Tạo từng user một để middleware pre('save') tự động hash password
    const users = [];
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save(); // Middleware sẽ tự động hash password
      users.push(user);
      console.log(`✓ Đã tạo user: ${user.userName} (${user.email})`);
    }

    // Map users
    const userMap = new Map();
    users.forEach((user) => {
      userMap.set(user.userName, user);
    });

    console.log(`✓ Đã tạo ${users.length} tài khoản người dùng`);
    return userMap;
  } catch (error) {
    console.error("❌ Lỗi khi tạo users:", error);
    throw error;
  }
};

module.exports = seedUsers;

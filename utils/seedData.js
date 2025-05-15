const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Đọc file config
dotenv.config();

// Import models
const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");
const Attribute = require("../models/Attribute");

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Dữ liệu seed
const categoriesData = [
  { name: "Laptop" },
  { name: "Điện thoại" },
  { name: "Máy tính bảng" },
  { name: "Thiết bị lưu trữ" },
];

const attributesData = [
  { name: "CPU" },
  { name: "RAM" },
  { name: "Bộ nhớ trong" },
  { name: "Kích thước màn" },
  { name: "Dung lượng pin" },
  { name: "Type" },
  { name: "Tốc độ đọc/ghi" },
];

// Hàm seed dữ liệu
const seedData = async () => {
  try {
    // Xóa dữ liệu cũ
    await mongoose.connection.collection("categories").deleteMany({});
    await mongoose.connection.collection("products").deleteMany({});
    await mongoose.connection.collection("users").deleteMany({});
    await mongoose.connection.collection("attributes").deleteMany({});

    // Thêm attributes
    const attributes = await Attribute.insertMany(attributesData);
    console.log("Đã thêm thuộc tính");

    // Thêm categories
    const categories = await Category.insertMany(categoriesData);
    console.log("Đã thêm danh mục");

    // Tạo liên kết giữa category và attributes
    const laptopCategory = categories[0];
    const phoneCategory = categories[1];
    const tabletCategory = categories[2];
    const storageCategory = categories[3];

    // Attributes cho laptop
    laptopCategory.attributes = [
      attributes[0]._id, // CPU
      attributes[1]._id, // RAM
      attributes[2]._id, // Bộ nhớ trong
      attributes[3]._id, // Kích thước màn
    ];
    await laptopCategory.save();

    // Attributes cho điện thoại
    phoneCategory.attributes = [
      attributes[0]._id, // CPU
      attributes[1]._id, // RAM
      attributes[2]._id, // Bộ nhớ trong
      attributes[4]._id, // Dung lượng pin
    ];
    await phoneCategory.save();

    // Attributes cho máy tính bảng
    tabletCategory.attributes = [
      attributes[0]._id, // CPU
      attributes[1]._id, // RAM
      attributes[3]._id, // Kích thước màn
      attributes[4]._id, // Dung lượng pin
    ];
    await tabletCategory.save();

    // Attributes cho thiết bị lưu trữ
    storageCategory.attributes = [
      attributes[5]._id, // Type
      attributes[6]._id, // Tốc độ đọc/ghi
    ];
    await storageCategory.save();

    // Thêm một số sản phẩm mẫu
    const products = [
      {
        name: "Laptop Dell XPS 13",
        description: "Laptop cao cấp với màn hình 13 inch, thiết kế mỏng nhẹ",
        price: 25000000,
        quantity: 15,
        category: laptopCategory._id,
        imageURL:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9310/media-gallery/xs9310t-cnb-00055lf110-sl.psd?fmt=pjpg&pscan=auto&scl=1&wid=3635&hei=2548&qlt=100,0&resMode=sharp2&size=3635,2548",
        attributeValues: [
          {
            attribute: attributes[0]._id,
            value: "Intel Core i7-1165G7",
          },
          {
            attribute: attributes[1]._id,
            value: "16GB LPDDR4x",
          },
          {
            attribute: attributes[2]._id,
            value: "512GB SSD",
          },
          {
            attribute: attributes[3]._id,
            value: "13.4 inch Full HD+",
          },
        ],
      },
      {
        name: "iPhone 14 Pro Max",
        description:
          "Smartphone cao cấp mới nhất từ Apple với camera chất lượng cao",
        price: 28000000,
        quantity: 30,
        category: phoneCategory._id,
        imageURL:
          "https://cdn.vox-cdn.com/thumbor/U8mo6VA0g6LlUenH4Hw_FBrsp4g=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/71350198/226270_iPhone_14_iPhone_14_Plus_Review_DSeifert_001.0.jpg",
        attributeValues: [
          {
            attribute: attributes[0]._id,
            value: "Apple A16 Bionic",
          },
          {
            attribute: attributes[1]._id,
            value: "6GB",
          },
          {
            attribute: attributes[2]._id,
            value: "256GB",
          },
          {
            attribute: attributes[4]._id,
            value: "4323 mAh",
          },
        ],
      },
      {
        name: "Samsung Galaxy Tab S8 Ultra",
        description: "Máy tính bảng cao cấp với màn hình lớn và S Pen",
        price: 20000000,
        quantity: 10,
        category: tabletCategory._id,
        imageURL:
          "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-x900nzaemea/gallery/levant-galaxy-tab-s8-ultra-wifi-x900-sm-x900nzaemea-530964559?$720_576_PNG$",
        attributeValues: [
          {
            attribute: attributes[0]._id,
            value: "Snapdragon 8 Gen 1",
          },
          {
            attribute: attributes[1]._id,
            value: "8GB",
          },
          {
            attribute: attributes[3]._id,
            value: "14.6 inch Super AMOLED",
          },
          {
            attribute: attributes[4]._id,
            value: "11200 mAh",
          },
        ],
      },
      {
        name: "SSD Samsung 970 EVO Plus 1TB",
        description: "Ổ cứng SSD NVMe hiệu suất cao",
        price: 3200000,
        quantity: 50,
        category: storageCategory._id,
        imageURL:
          "https://m.media-amazon.com/images/I/81TFjl7PpWL._AC_SL1500_.jpg",
        attributeValues: [
          {
            attribute: attributes[5]._id,
            value: "NVMe SSD",
          },
          {
            attribute: attributes[6]._id,
            value: "Đọc: 3500MB/s, Ghi: 3300MB/s",
          },
        ],
      },
    ];

    await Product.insertMany(products);
    console.log("Đã thêm sản phẩm mẫu");

    // Tạo tài khoản admin
    const passwordHash = await bcrypt.hash("admin123", 10);
    await User.create({
      fullName: "Admin User",
      email: "admin@example.com",
      password: passwordHash,
      role: "admin",
    });

    // Tạo tài khoản customer
    await User.create({
      fullName: "Khách hàng",
      email: "customer@example.com",
      password: await bcrypt.hash("customer123", 10),
      phone: "0123456789",
      address: "Hồ Chí Minh",
    });

    console.log("Đã tạo tài khoản người dùng mẫu");

    console.log("Seeding dữ liệu hoàn tất!");
    process.exit();
  } catch (error) {
    console.error("Lỗi khi seeding dữ liệu:", error);
    process.exit(1);
  }
};

seedData();

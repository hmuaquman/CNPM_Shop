const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load các seeders
const seedCategories = require("./categorySeeder");
const seedAttributes = require("./attributeSeeder");
const seedUsers = require("./userSeeder");
const seedProducts = require("./productSeeder");
const seedReviews = require("./reviewSeeder");
const seedCarts = require("./cartSeeder");
const seedOrders = require("./orderSeeder");

// Đọc file config từ thư mục gốc của dự án
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Hàm xóa dữ liệu cũ
const clearData = async () => {
  console.log("Đang xóa dữ liệu cũ...");
  await Promise.all([
    mongoose.connection.collection("categories").deleteMany({}),
    mongoose.connection.collection("attributes").deleteMany({}),
    mongoose.connection.collection("products").deleteMany({}),
    mongoose.connection.collection("users").deleteMany({}),
    mongoose.connection.collection("carts").deleteMany({}),
    mongoose.connection.collection("orders").deleteMany({}),
    mongoose.connection.collection("reviews").deleteMany({}),
  ]);
  console.log("Đã xóa dữ liệu cũ");
};

// Hàm seed tất cả dữ liệu
const seedAll = async () => {
  try {
    // Bước 1: Xóa dữ liệu cũ
    await clearData();

    // Bước 2: Seed dữ liệu theo thứ tự phù hợp
    // (Đảm bảo dữ liệu độc lập được tạo trước)
    const attributes = await seedAttributes();
    const categories = await seedCategories(attributes);
    const users = await seedUsers();
    const products = await seedProducts(categories, attributes);
    
    // Dữ liệu phụ thuộc vào users và products
    await seedReviews(users, products);
    await seedCarts(users, products);
    await seedOrders(users, products);

    console.log("Seeding dữ liệu hoàn tất!");
    process.exit(0);
  } catch (error) {
    console.error("Lỗi khi seeding dữ liệu:", error);
    process.exit(1);
  }
};

// Chạy seed
seedAll();
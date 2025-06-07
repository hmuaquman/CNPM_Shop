const Cart = require("../../models/Cart");

const seedCarts = async (userMap, productMap) => {
  console.log("Đang tạo giỏ hàng...");
  console.log("Sản phẩm có sẵn:", Array.from(productMap.keys()));

  // Kiểm tra xem các sản phẩm cần thiết có tồn tại không
  const requiredProducts = [
    "Laptop Dell XPS 13 (2025)",
    "SSD Samsung 990 PRO 2TB NVMe",
    "iPhone 15 Pro Max",
  ];

  const missingProducts = requiredProducts.filter(
    (name) => !productMap.has(name)
  );
  if (missingProducts.length > 0) {
    console.warn("Cảnh báo: Các sản phẩm sau không tồn tại:", missingProducts);
    console.log("Bỏ qua việc tạo giỏ hàng cho các sản phẩm không tồn tại");
  }

  const cartsToCreate = [];

  // Chỉ tạo giỏ hàng cho nguyenvana nếu tất cả sản phẩm cần thiết tồn tại
  if (
    productMap.has("Laptop Dell XPS 13 (2025)") &&
    productMap.has("SSD Samsung 990 PRO 2TB NVMe") &&
    userMap.has("nguyenvana")
  ) {
    cartsToCreate.push({
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("Laptop Dell XPS 13 (2025)")._id,
          variantId: "DELL-XPS13-I7-16-512",
          quantity: 1,
          price: 28800000, // Giá sau khuyến mãi
          name: "Laptop Dell XPS 13 (2025)",
          variantInfo: {
            ram: "16GB",
            storage: "512GB SSD",
            color: "Bạc",
          },
          image: productMap.get("Laptop Dell XPS 13 (2025)").imageURL,
        },
        {
          product: productMap.get("SSD Samsung 990 PRO 2TB NVMe")._id,
          variantId: "SS-990PRO-2TB",
          quantity: 1,
          price: 5990000,
          name: "SSD Samsung 990 PRO 2TB NVMe",
          variantInfo: {
            storage: "2TB",
          },
          image: productMap.get("SSD Samsung 990 PRO 2TB NVMe").imageURL,
        },
      ],
      totalAmount: 34790000, // 28800000 + 5990000
    });
  }

  // Chỉ tạo giỏ hàng cho tranthib nếu iPhone tồn tại
  if (productMap.has("iPhone 15 Pro Max") && userMap.has("tranthib")) {
    cartsToCreate.push({
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("iPhone 15 Pro Max")._id,
          variantId: "IP15PM-256-TITAN",
          quantity: 1,
          price: 33240500, // Giá sau khuyến mãi
          name: "iPhone 15 Pro Max",
          variantInfo: {
            storage: "256GB",
            color: "Titan Đen",
            ram: "8GB",
          },
          image: productMap.get("iPhone 15 Pro Max").imageURL,
        },
      ],
      totalAmount: 33240500,
    });
  }

  if (cartsToCreate.length > 0) {
    await Cart.insertMany(cartsToCreate);
    console.log(`Đã tạo ${cartsToCreate.length} giỏ hàng`);
  } else {
    console.log("Không có giỏ hàng nào được tạo");
  }
};

module.exports = seedCarts;

const Order = require("../../models/Order");

const seedOrders = async (userMap, productMap) => {
  console.log("Đang tạo đơn hàng mẫu...");

  const ordersToCreate = [
    {
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("SSD Samsung 990 PRO 2TB NVMe")._id,
          variantId: "SS-990PRO-2TB",
          name: "SSD Samsung 990 PRO 2TB NVMe",
          price: 5990000,
          quantity: 1,
          variantInfo: {
            storage: "2TB",
          },
        },
      ],
      shippingAddress: {
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GHTK",
        trackingCode: "GHTK12345678",
        shippingFee: 30000,
        estimatedDeliveryDate: new Date("2025-06-05"),
      },
      itemsAmount: 5990000,
      totalAmount: 6020000, // 5990000 + 30000
      paymentMethod: "cod",
      status: "Processing",
      paymentStatus: "pending",
      createdAt: new Date("2025-06-02"),
    },
  ];

  await Order.insertMany(ordersToCreate);
  console.log("Đã tạo đơn hàng mẫu");
};

module.exports = seedOrders;

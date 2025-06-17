const Order = require("../../models/Order");

const seedOrders = async (userMap, productMap) => {
  console.log("Đang xóa đơn hàng cũ...");
  
  // XÓA TẤT CẢ ĐƠN HÀNG CŨ TRƯỚC KHI SEED MỚI
  await Order.deleteMany({});
  console.log("✅ Đã xóa đơn hàng cũ");
  
  console.log("Đang tạo đơn hàng mẫu...");

  // Hàm tạo orderNumber
  const generateOrderNumber = (index) => {
    const timestamp = Date.now().toString().slice(-6); // 6 số cuối của timestamp
    const orderIndex = (index + 1).toString().padStart(3, '0'); // 3 chữ số với padding
    return `ORD${timestamp}${orderIndex}`;
  };

  const ordersToCreate = [
    // ===== ĐƠN HÀNG THÁNG HIỆN TẠI (THÁNG 6/2025) =====
    {
      orderNumber: generateOrderNumber(0),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("SSD Samsung 990 PRO 2TB NVMe")._id,
          variantId: "SS-990PRO-2TB",
          name: "SSD Samsung 990 PRO 2TB NVMe",
          price: 5990000,
          quantity: 1,
          variantInfo: { storage: "2TB" },
        },
      ],
      itemsAmount: 5990000,
      shippingFee: 30000,
      totalAmount: 6020000,
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
      paymentMethod: "cod",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-06-02"),
    },

    {
      orderNumber: generateOrderNumber(1),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("iPhone 15 Pro Max")._id,
          variantId: "IP15PM-256GB-NT",
          name: "iPhone 15 Pro Max",
          price: 34990000,
          quantity: 1,
          variantInfo: { storage: "256GB", color: "Natural Titanium" },
        },
        {
          product: productMap.get("iPad Pro M4 11 inch")._id,
          variantId: "IPP-M4-11-256GB",
          name: "iPad Pro M4 11 inch",
          price: 28990000,
          quantity: 1,
          variantInfo: { storage: "256GB", color: "Space Gray" },
        },
      ],
      itemsAmount: 63980000,
      shippingFee: 50000,
      totalAmount: 64030000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "ViettelPost",
        trackingCode: "VTP87654321",
        shippingFee: 50000,
        estimatedDeliveryDate: new Date("2025-06-08"),
      },
      paymentMethod: "bank_transfer",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-06-01"),
    },

    {
      orderNumber: generateOrderNumber(2),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("MacBook Air M2")._id,
          variantId: "MBA-M2-256GB-SG",
          name: "MacBook Air M2",
          price: 28990000,
          quantity: 1,
          variantInfo: { storage: "256GB", color: "Space Gray" },
        },
      ],
      itemsAmount: 28990000,
      shippingFee: 0,
      totalAmount: 28990000,
      shippingAddress: {
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "J&T",
        trackingCode: "JT901234567",
        shippingFee: 0,
        estimatedDeliveryDate: new Date("2025-06-10"),
      },
      paymentMethod: "credit_card",
      status: "Processing",
      paymentStatus: "completed",
      createdAt: new Date("2025-06-03"),
    },

    // ===== ĐƠN HÀNG THÁNG 5/2025 =====
    {
      orderNumber: generateOrderNumber(3),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("Samsung Galaxy S24 Ultra")._id,
          variantId: "SGS24U-256GB-TG",
          name: "Samsung Galaxy S24 Ultra",
          price: 31990000,
          quantity: 1,
          variantInfo: { storage: "256GB", color: "Titanium Gray" },
        },
      ],
      itemsAmount: 31990000,
      shippingFee: 25000,
      totalAmount: 32015000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GrabExpress",
        trackingCode: "SPX34567890",
        shippingFee: 25000,
        estimatedDeliveryDate: new Date("2025-05-28"),
      },
      paymentMethod: "momo",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-05-25"),
    },

    {
      orderNumber: generateOrderNumber(4),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("Laptop Dell XPS 13 (2025)")._id,
          variantId: "DXPS13-2025-512GB-S",
          name: "Laptop Dell XPS 13 (2025)",
          price: 45990000,
          quantity: 1,
          variantInfo: { storage: "512GB", color: "Silver" },
        },
        {
          product: productMap.get("Ổ cứng di động SSD ADATA SC750 USB 3.2 Gen 2")._id,
          variantId: "ADATA-SC750-1TB",
          name: "Ổ cứng di động SSD ADATA SC750 USB 3.2 Gen 2",
          price: 2490000,
          quantity: 1,
          variantInfo: { capacity: "1TB" },
        },
      ],
      itemsAmount: 48480000,
      shippingFee: 35000,
      totalAmount: 48515000,
      shippingAddress: {
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GHN",
        trackingCode: "GHN45678901",
        shippingFee: 35000,
        estimatedDeliveryDate: new Date("2025-05-20"),
      },
      paymentMethod: "zalo_pay",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-05-15"),
    },

    // ===== ĐƠN HÀNG THÁNG 4/2025 =====
    {
      orderNumber: generateOrderNumber(5),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("Laptop ASUS ROG Strix G15 G513QR-HQ264T")._id,
          variantId: "ASUS-ROG-G15-RTX3070",
          name: "Laptop ASUS ROG Strix G15 G513QR-HQ264T",
          price: 35990000,
          quantity: 1,
          variantInfo: { gpu: "RTX 3070", ram: "16GB" },
        },
      ],
      itemsAmount: 35990000,
      shippingFee: 50000,
      totalAmount: 36040000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GHTK",
        trackingCode: "GHTK56789012",
        shippingFee: 50000,
        estimatedDeliveryDate: new Date("2025-04-25"),
      },
      paymentMethod: "cod",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-04-20"),
    },

    // ===== ĐƠN HÀNG THÁNG 3/2025 =====
    {
      orderNumber: generateOrderNumber(6),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("MacBook Pro 13 inch 2020")._id,
          variantId: "MBP13-2020-512GB",
          name: "MacBook Pro 13 inch 2020",
          price: 32990000,
          quantity: 1,
          variantInfo: { storage: "512GB", color: "Space Gray" },
        },
      ],
      itemsAmount: 32990000,
      shippingFee: 40000,
      totalAmount: 33030000,
      shippingAddress: {
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "ViettelPost",
        trackingCode: "VTP67890123",
        shippingFee: 40000,
        estimatedDeliveryDate: new Date("2025-03-18"),
      },
      paymentMethod: "bank_transfer",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-03-15"),
    },

    // ===== ĐƠN HÀNG THÁNG 2/2025 =====
    {
      orderNumber: generateOrderNumber(7),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("Laptop Gaming Acer Nitro V ANV15-51-58AN")._id,
          variantId: "ACER-NITRO-V-RTX4050",
          name: "Laptop Gaming Acer Nitro V ANV15-51-58AN",
          price: 25990000,
          quantity: 1,
          variantInfo: { gpu: "RTX 4050", ram: "16GB" },
        },
      ],
      itemsAmount: 25990000,
      shippingFee: 50000,
      totalAmount: 26040000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "J&T",
        trackingCode: "JT78901234",
        shippingFee: 50000,
        estimatedDeliveryDate: new Date("2025-02-22"),
      },
      paymentMethod: "credit_card",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-02-18"),
    },

    // ===== ĐƠN HÀNG THÁNG 1/2025 =====
    {
      orderNumber: generateOrderNumber(8),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("Laptop MSI Modern 14 C12MO-660VN")._id,
          variantId: "MSI-MODERN14-I5",
          name: "Laptop MSI Modern 14 C12MO-660VN",
          price: 18990000,
          quantity: 1,
          variantInfo: { cpu: "Intel i5", ram: "8GB" },
        },
        {
          product: productMap.get("Huawei MatePad (Papermatte) 11.5 inch 2025 8GB 256GB - Kèm bàn phím")._id,
          variantId: "HUAWEI-MATEPAD-11.5-256GB",
          name: "Huawei MatePad (Papermatte) 11.5 inch 2025",
          price: 12990000,
          quantity: 1,
          variantInfo: { storage: "256GB", ram: "8GB" },
        },
      ],
      itemsAmount: 31980000,
      shippingFee: 45000,
      totalAmount: 32025000,
      shippingAddress: {
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GrabExpress",
        trackingCode: "SPX89012345",
        shippingFee: 45000,
        estimatedDeliveryDate: new Date("2025-01-25"),
      },
      paymentMethod: "momo",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-01-20"),
    },

    // ===== ĐƠN HÀNG THÁNG 12/2024 =====
    {
      orderNumber: generateOrderNumber(9),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("Laptop MSI Titan 18 HX AI A2XWJG 622VN | CPU Ultra 9-285HX | RAM 64GB DDR5 | SSD 6TB PCIe | VGA RTX 5090 24GB | 18.0 UHD 4K MiniLED IPS, 100% DCI-P3 & 120Hz | Win11")._id,
          variantId: "MSI-TITAN18-RTX5090",
          name: "Laptop MSI Titan 18 HX AI A2XWJG 622VN",
          price: 199990000,
          quantity: 1,
          variantInfo: { gpu: "RTX 5090 24GB", ram: "64GB DDR5", storage: "6TB PCIe" },
        },
      ],
      itemsAmount: 199990000,
      shippingFee: 0,
      totalAmount: 199990000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GHN",
        trackingCode: "GHN90123456",
        shippingFee: 0,
        estimatedDeliveryDate: new Date("2024-12-28"),
      },
      paymentMethod: "bank_transfer",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2024-12-25"),
    },

    // ===== MỘT SỐ ĐƠN HÀNG KHÁC (PENDING, CANCELLED) =====
    {
      orderNumber: generateOrderNumber(10),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("Xiaomi 14T Pro")._id,
          variantId: "X14TP-256GB-BLACK",
          name: "Xiaomi 14T Pro",
          price: 14990000,
          quantity: 1,
          variantInfo: { storage: "256GB", color: "Black" },
        },
      ],
      itemsAmount: 14990000,
      shippingFee: 30000,
      totalAmount: 15020000,
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
        trackingCode: "GHTK01234567",
        shippingFee: 30000,
        estimatedDeliveryDate: new Date("2025-06-12"),
      },
      paymentMethod: "cod",
      status: "Pending",
      paymentStatus: "pending",
      createdAt: new Date("2025-06-04"),
    },

    {
      orderNumber: generateOrderNumber(11),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("Laptop Lenovo LOQ 15IAX9E 83LK0036VN")._id,
          variantId: "LENOVO-LOQ15-RTX4060",
          name: "Laptop Lenovo LOQ 15IAX9E 83LK0036VN",
          price: 22990000,
          quantity: 1,
          variantInfo: { gpu: "RTX 4060", ram: "16GB" },
        },
      ],
      itemsAmount: 22990000,
      shippingFee: 25000,
      totalAmount: 23015000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "ViettelPost",
        trackingCode: "VTP12345678",
        shippingFee: 25000,
        estimatedDeliveryDate: new Date("2025-05-30"),
      },
      paymentMethod: "bank_transfer",
      status: "Canceled",
      paymentStatus: "failed",
      createdAt: new Date("2025-05-28"),
    },

    // Thêm một số đơn hàng nữa để có đủ dữ liệu
    {
      orderNumber: generateOrderNumber(12),
      user: userMap.get("nguyenvana")._id,
      items: [
        {
          product: productMap.get("Laptop ThinkPad X1 Yoga Gen 6 2021")._id,
          variantId: "TP-X1YOGA-G6-512GB",
          name: "Laptop ThinkPad X1 Yoga Gen 6 2021",
          price: 42990000,
          quantity: 1,
          variantInfo: { storage: "512GB", ram: "16GB" },
        },
      ],
      itemsAmount: 42990000,
      shippingFee: 40000,
      totalAmount: 43030000,
      shippingAddress: {
        recipientName: "Nguyễn Văn A",
        recipientPhone: "0912345678",
        streetAndNumber: "123 Lê Lợi",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "J&T",
        trackingCode: "JT11223344",
        shippingFee: 40000,
        estimatedDeliveryDate: new Date("2025-01-15"),
      },
      paymentMethod: "credit_card",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2025-01-10"),
    },

    {
      orderNumber: generateOrderNumber(13),
      user: userMap.get("tranthib")._id,
      items: [
        {
          product: productMap.get("Máy tính bảng Lenovo Idea Tab Pro ZAE40190VN")._id,
          variantId: "LENOVO-IDEATAB-PRO-128GB",
          name: "Máy tính bảng Lenovo Idea Tab Pro ZAE40190VN",
          price: 8990000,
          quantity: 1,
          variantInfo: { storage: "128GB", ram: "6GB" },
        },
      ],
      itemsAmount: 8990000,
      shippingFee: 30000,
      totalAmount: 9020000,
      shippingAddress: {
        recipientName: "Trần Thị B",
        recipientPhone: "0987654321",
        streetAndNumber: "456 Nguyễn Huệ",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
      shippingInfo: {
        provider: "GHN",
        trackingCode: "GHN55667788",
        shippingFee: 30000,
        estimatedDeliveryDate: new Date("2024-11-25"),
      },
      paymentMethod: "momo",
      status: "Delivered",
      paymentStatus: "completed",
      createdAt: new Date("2024-11-20"),
    },
  ];

  try {
    await Order.insertMany(ordersToCreate);
    console.log(`✅ Đã tạo ${ordersToCreate.length} đơn hàng mẫu`);
    
    // In thống kê
    const deliveredOrders = ordersToCreate.filter(order => order.status === 'Delivered');
    const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    console.log(`📊 Thống kê:`);
    console.log(`- Đơn hàng đã giao: ${deliveredOrders.length}`);
    console.log(`- Tổng doanh thu: ${totalRevenue.toLocaleString('vi-VN')} VNĐ`);
    console.log(`- Đơn hàng pending: ${ordersToCreate.filter(o => o.status === 'Pending').length}`);
    console.log(`- Đơn hàng processing: ${ordersToCreate.filter(o => o.status === 'Processing').length}`);
    console.log(`- Đơn hàng cancelled: ${ordersToCreate.filter(o => o.status === 'Canceled').length}`);
    
  } catch (error) {
    console.error("❌ Lỗi khi tạo đơn hàng:", error.message);
    throw error;
  }
};

module.exports = seedOrders;
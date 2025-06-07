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
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Review = require("../models/Review");

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// =============================================
// 1. DỮ LIỆU DANH MỤC, THUỘC TÍNH
// =============================================

const categoriesData = [
  {
    name: "Laptop",
    description: "Máy tính xách tay từ các thương hiệu hàng đầu",
  },
  {
    name: "Điện thoại",
    description: "Điện thoại thông minh với nhiều tính năng hiện đại",
  },
  {
    name: "Máy tính bảng",
    description:
      "Thiết bị di động màn hình lớn, tiện lợi cho giải trí và công việc",
  },
  { name: "Thiết bị lưu trữ", description: "Ổ cứng SSD, HDD, thẻ nhớ và USB" },
  {
    name: "Màn hình",
    description: "Màn hình máy tính với nhiều kích thước và độ phân giải",
  },
  {
    name: "Linh kiện PC",
    description: "Các linh kiện để nâng cấp hoặc tự build PC",
  },
];

const attributesData = [
  { name: "CPU" },
  { name: "RAM" },
  { name: "Bộ nhớ trong" },
  { name: "Kích thước màn" },
  { name: "Dung lượng pin" },
  { name: "Type" },
  { name: "Tốc độ đọc/ghi" },
  { name: "Hệ điều hành" },
  { name: "Camera" },
  { name: "Card đồ họa" },
  { name: "Tần số quét" },
  { name: "Cổng kết nối" },
  { name: "Công nghệ màn hình" },
  { name: "Kết nối không dây" },
];

// =============================================
// 2. DỮ LIỆU NGƯỜI DÙNG VÀ ĐỊA CHỈ
// =============================================

const usersData = [
  {
    fullName: "Admin User",
    userName: "admin",
    email: "admin@example.com",
    password: "admin123",
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
    password: "password123",
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
    password: "password123",
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

// =============================================
// 4. SẢN PHẨM MẪU THEO DANH MỤC
// =============================================

const productsData = () => [
  // LAPTOP
  {
    name: "Laptop Dell XPS 13 (2025)",
    description:
      "Laptop cao cấp với màn hình 13 inch, thiết kế mỏng nhẹ, hiệu năng mạnh mẽ với chip Intel thế hệ mới nhất",
    brand: "Dell",
    basePrice: 32000000,
    discountPercentage: 10,
    discountPrice: 28800000,
    discountStartDate: new Date("2025-05-20"),
    discountEndDate: new Date("2025-06-20"),
    price: 28800000,
    quantity: 20,
    commonSpecs: {
      processor: "Intel Core i7-12700H",
      operatingSystem: "Windows 11 Home",
      screenSize: "13.4 inch",
      weight: "1.24 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 2 năm, pin 1 năm",
      },
    },
    variants: [
      {
        sku: "DELL-XPS13-I7-16-512",
        price: 32000000,
        stock: 10,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Bạc",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-1TB",
        price: 38000000,
        stock: 5,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Bạc",
        },
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-16-512-BLACK",
        price: 32500000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "dell", "mỏng nhẹ", "cao cấp", "xps"],
    imageURL:
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9320/media-gallery/xs9320t-cnb-00000ff090-sl.psd?fmt=pjpg&pscan=auto&scl=1&wid=3319&hei=2405&qlt=100,0&resMode=sharp2&size=3319,2405",
  },
  {
    name: "Laptop Asus ROG Strix G15",
    description:
      "Laptop gaming mạnh mẽ với màn hình 15.6 inch, card đồ họa RTX 3060, thiết kế tản nhiệt hiệu quả",
    brand: "Asus",
    basePrice: 28500000,
    price: 28500000,
    quantity: 15,
    commonSpecs: {
      processor: "AMD Ryzen 9 5900HX",
      operatingSystem: "Windows 11 Home",
      screenSize: "15.6 inch",
      weight: "2.3 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 2 năm",
      },
    },
    variants: [
      {
        sku: "ASUS-ROG-R9-16-512",
        price: 28500000,
        stock: 8,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "ASUS-ROG-R9-32-1TB",
        price: 33000000,
        stock: 7,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Đen",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "asus", "gaming", "rog", "ryzen"],
    imageURL:
      "https://dlcdnwebimgs.asus.com/gain/31814954-8900-4254-B777-E40BEDAFDAA9/w1000/h732",
  },
  {
    name: "Laptop Apple MacBook Air M3",
    description:
      "Siêu mỏng, siêu nhẹ với chip Apple Silicon M3 mạnh mẽ, thời lượng pin cả ngày",
    brand: "Apple",
    basePrice: 29990000,
    price: 29990000,
    quantity: 25,
    commonSpecs: {
      processor: "Apple M3",
      operatingSystem: "macOS Sequoia",
      screenSize: "13.6 inch",
      weight: "1.24 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "1 năm bảo hành tiêu chuẩn",
      },
    },
    variants: [
      {
        sku: "APPLE-MBA-M3-8-256",
        price: 29990000,
        stock: 15,
        attributes: {
          ram: "8GB",
          storage: "256GB SSD",
          color: "Midnight",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "APPLE-MBA-M3-8-512",
        price: 35990000,
        stock: 10,
        attributes: {
          ram: "8GB",
          storage: "512GB SSD",
          color: "Starlight",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "macbook", "apple", "m3", "macbook air"],
    imageURL:
      "https://www.apple.com/v/macbook-air/q/images/overview/hero_mba_m2__ejbs627dj7ee_large.jpg",
  },

  // ĐIỆN THOẠI
  {
    name: "iPhone 15 Pro Max",
    description:
      "Smartphone cao cấp mới nhất từ Apple với camera chất lượng cao, chip A17 Pro và Dynamic Island",
    brand: "Apple",
    basePrice: 34990000,
    discountPercentage: 5,
    discountPrice: 33240500,
    discountStartDate: new Date("2025-05-15"),
    discountEndDate: new Date("2025-06-15"),
    price: 33240500,
    quantity: 50,
    commonSpecs: {
      processor: "Apple A17 Pro",
      operatingSystem: "iOS 17",
      screenSize: "6.7 inch",
      weight: "221g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "1 năm bảo hành tiêu chuẩn",
      },
    },
    variants: [
      {
        sku: "IP15PM-256-TITAN",
        price: 34990000,
        stock: 20,
        attributes: {
          storage: "256GB",
          color: "Titan Đen",
          ram: "8GB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "IP15PM-512-TITAN",
        price: 39990000,
        stock: 15,
        attributes: {
          storage: "512GB",
          color: "Titan Tự Nhiên",
          ram: "8GB",
        },
        status: "active",
      },
      {
        sku: "IP15PM-1TB-TITAN",
        price: 45990000,
        stock: 10,
        attributes: {
          storage: "1TB",
          color: "Titan Xanh",
          ram: "8GB",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["điện thoại", "iphone", "apple", "cao cấp", "pro max"],
    imageURL:
      "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large_2x.jpg",
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    description:
      "Flagship mới nhất của Samsung với camera độ phân giải cao, bút S-Pen tích hợp và màn hình Dynamic AMOLED 2X",
    brand: "Samsung",
    basePrice: 32990000,
    price: 32990000,
    quantity: 40,
    commonSpecs: {
      processor: "Snapdragon 8 Gen 3",
      operatingSystem: "Android 15",
      screenSize: "6.8 inch",
      weight: "234g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 12 tháng",
      },
    },
    variants: [
      {
        sku: "SS-S25U-12-256-BLK",
        price: 32990000,
        stock: 15,
        attributes: {
          ram: "12GB",
          storage: "256GB",
          color: "Phantom Black",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "SS-S25U-12-512-GREEN",
        price: 35990000,
        stock: 10,
        attributes: {
          ram: "12GB",
          storage: "512GB",
          color: "Green",
        },
        status: "active",
      },
      {
        sku: "SS-S25U-12-1TB-WHITE",
        price: 39990000,
        stock: 5,
        attributes: {
          ram: "12GB",
          storage: "1TB",
          color: "Cream",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["điện thoại", "samsung", "galaxy", "s ultra", "android"],
    imageURL:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/2307/gallery/vn-galaxy-z-fold5-f946-sm-f946bzuixxv-thumb-535806435?imwidth=480",
  },
  {
    name: "Xiaomi 14 Ultra",
    description:
      "Smartphone cao cấp với hệ thống 4 camera Leica, màn hình AMOLED và sạc siêu nhanh 120W",
    brand: "Xiaomi",
    basePrice: 24990000,
    discountPercentage: 10,
    discountPrice: 22491000,
    discountStartDate: new Date("2025-06-01"),
    discountEndDate: new Date("2025-06-30"),
    price: 22491000,
    quantity: 30,
    commonSpecs: {
      processor: "Snapdragon 8 Gen 3",
      operatingSystem: "Android 15 với MIUI 15",
      screenSize: "6.73 inch",
      weight: "219g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 18,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 18 tháng",
      },
    },
    variants: [
      {
        sku: "MI-14U-12-256-BLACK",
        price: 24990000,
        stock: 20,
        attributes: {
          ram: "12GB",
          storage: "256GB",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "MI-14U-12-512-WHITE",
        price: 27990000,
        stock: 10,
        attributes: {
          ram: "12GB",
          storage: "512GB",
          color: "Trắng",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: false,
    tags: ["điện thoại", "xiaomi", "camera", "leica", "android"],
    imageURL:
      "https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-14-xanh-thumb-600x600.jpg",
  },

  // MÁY TÍNH BẢNG
  {
    name: "iPad Pro M3 12.9 inch",
    description:
      "Máy tính bảng cao cấp mạnh mẽ như laptop với chip M3, màn hình mini-LED XDR 120Hz và hỗ trợ Apple Pencil Pro",
    brand: "Apple",
    basePrice: 34990000,
    price: 34990000,
    quantity: 20,
    commonSpecs: {
      processor: "Apple M3",
      operatingSystem: "iPadOS 17",
      screenSize: "12.9 inch",
      weight: "682g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "1 năm bảo hành tiêu chuẩn",
      },
    },
    variants: [
      {
        sku: "IPAD-PRO-M3-8-256-WIFI",
        price: 34990000,
        stock: 10,
        attributes: {
          ram: "8GB",
          storage: "256GB",
          connectivity: "WiFi",
          color: "Space Gray",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "IPAD-PRO-M3-8-512-WIFI",
        price: 39990000,
        stock: 5,
        attributes: {
          ram: "8GB",
          storage: "512GB",
          connectivity: "WiFi",
          color: "Silver",
        },
        status: "active",
      },
      {
        sku: "IPAD-PRO-M3-16-1TB-5G",
        price: 49990000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "1TB",
          connectivity: "WiFi+5G",
          color: "Space Gray",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["máy tính bảng", "tablet", "ipad", "apple", "m3"],
    imageURL:
      "https://www.apple.com/v/ipad-pro/am/images/overview/hero/hero_ipad_pro_static__f5j4ua5zby66_large.jpg",
  },
  {
    name: "Samsung Galaxy Tab S10 Ultra",
    description:
      "Máy tính bảng Android cao cấp với màn hình Super AMOLED lớn, bút S-Pen và hiệu năng mạnh mẽ",
    brand: "Samsung",
    basePrice: 30990000,
    discountPercentage: 10,
    discountPrice: 27891000,
    discountStartDate: new Date("2025-05-15"),
    discountEndDate: new Date("2025-06-15"),
    price: 27891000,
    quantity: 15,
    commonSpecs: {
      processor: "Snapdragon 8 Gen 3",
      operatingSystem: "Android 15",
      screenSize: "14.6 inch",
      weight: "726g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 12 tháng",
      },
    },
    variants: [
      {
        sku: "SS-TABS10-12-256-BLK-WIFI",
        price: 30990000,
        stock: 8,
        attributes: {
          ram: "12GB",
          storage: "256GB",
          connectivity: "WiFi",
          color: "Graphite",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "SS-TABS10-16-512-GRN-5G",
        price: 35990000,
        stock: 7,
        attributes: {
          ram: "16GB",
          storage: "512GB",
          connectivity: "WiFi+5G",
          color: "Green",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["máy tính bảng", "tablet", "samsung", "android", "s-pen"],
    imageURL:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/sm-x900nzaaxxv/gallery/vn-galaxy-tab-s8-ultra-wifi-x900-sm-x900nzaaxxv-530999631?$720_576_PNG$",
  },

  // THIẾT BỊ LƯU TRỮ
  {
    name: "SSD Samsung 990 PRO 2TB NVMe",
    description:
      "Ổ cứng SSD NVMe hiệu suất cao, tốc độ đọc/ghi vượt trội, phù hợp cho gaming và công việc đòi hỏi xử lý dữ liệu nhanh",
    brand: "Samsung",
    basePrice: 5990000,
    price: 5990000,
    quantity: 50,
    commonSpecs: {
      type: "NVMe PCIe 4.0",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 60,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 5 năm",
      },
    },
    variants: [
      {
        sku: "SS-990PRO-2TB",
        price: 5990000,
        stock: 30,
        attributes: {
          storage: "2TB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "SS-990PRO-1TB",
        price: 3290000,
        stock: 20,
        attributes: {
          storage: "1TB",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: false,
    tags: ["ssd", "lưu trữ", "nvme", "samsung", "nhanh"],
    imageURL:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/mz-v9p2t0bw/gallery/vn-990-pro-with-heatsink-mz-v9p2t0bw-537200375?$650_519_PNG$",
    attributeValues: [
      {
        attribute: (attributesMap) => attributesMap.get("Type"),
        value: "NVMe PCIe 4.0",
      },
      {
        attribute: (attributesMap) => attributesMap.get("Tốc độ đọc/ghi"),
        value: "Đọc: 7,450MB/s, Ghi: 6,900MB/s",
      },
    ],
  },
  {
    name: "Ổ cứng di động WD My Passport 4TB",
    description:
      "Ổ cứng di động nhỏ gọn, dung lượng lớn, bảo mật với mật khẩu và mã hóa phần cứng",
    brand: "Western Digital",
    basePrice: 2990000,
    discountPercentage: 15,
    discountPrice: 2541500,
    discountStartDate: new Date("2025-06-01"),
    discountEndDate: new Date("2025-06-30"),
    price: 2541500,
    quantity: 40,
    commonSpecs: {
      type: "HDD External",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 36,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 3 năm",
      },
    },
    variants: [
      {
        sku: "WD-PASSPORT-4TB-BLUE",
        price: 2990000,
        stock: 20,
        attributes: {
          storage: "4TB",
          color: "Xanh",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "WD-PASSPORT-4TB-BLACK",
        price: 2990000,
        stock: 15,
        attributes: {
          storage: "4TB",
          color: "Đen",
        },
        status: "active",
      },
      {
        sku: "WD-PASSPORT-5TB-BLACK",
        price: 3690000,
        stock: 5,
        attributes: {
          storage: "5TB",
          color: "Đen",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: false,
    tags: ["ổ cứng", "hdd", "di động", "western digital", "lưu trữ"],
    imageURL:
      "https://www.westerndigital.com/content/dam/store/en-us/assets/products/portable/wd-my-passport-2023-colorways/gallery/wd-my-passport-2023-blue.png.wdthumb.1280.1280.webp",
    attributeValues: [
      {
        attribute: (attributesMap) => attributesMap.get("Type"),
        value: 'HDD External 2.5"',
      },
      {
        attribute: (attributesMap) => attributesMap.get("Tốc độ đọc/ghi"),
        value: "Tối đa 5Gbps (USB 3.0)",
      },
    ],
  },

  // MÀN HÌNH
  {
    name: 'Màn hình Samsung Odyssey G7 27"',
    description:
      "Màn hình gaming cong 1440p với tần số quét 240Hz, thời gian phản hồi 1ms và công nghệ QLED",
    brand: "Samsung",
    basePrice: 15990000,
    price: 15990000,
    quantity: 20,
    commonSpecs: {
      screenSize: "27 inch",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 36,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 3 năm, 1 đổi 1 trong 1 tháng nếu có điểm ảnh chết",
      },
    },
    variants: [
      {
        sku: "SS-G7-27",
        price: 15990000,
        stock: 20,
        attributes: {
          displaySize: "27 inch",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "SS-G7-32",
        price: 18990000,
        stock: 15,
        attributes: {
          displaySize: "32 inch",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["màn hình", "gaming", "samsung", "cong", "qled", "240hz"],
    imageURL:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/lc27g75tqsexxv/gallery/vn-odyssey-g7-c27g75t-lc27g75tqsexxv-416254086?$650_519_PNG$",
    attributeValues: [
      {
        attribute: (attributesMap) => attributesMap.get("Kích thước màn"),
        value: "27 inch",
      },
      {
        attribute: (attributesMap) => attributesMap.get("Tần số quét"),
        value: "240Hz",
      },
      {
        attribute: (attributesMap) => attributesMap.get("Công nghệ màn hình"),
        value: "QLED, HDR600",
      },
    ],
  },

  // LINH KIỆN PC
  {
    name: "CPU AMD Ryzen 9 7950X",
    description:
      "CPU hiệu năng cao 16 nhân 32 luồng, xung nhịp tối đa 5.7GHz, phù hợp cho gaming và công việc chuyên nghiệp",
    brand: "AMD",
    basePrice: 16990000,
    discountPercentage: 8,
    discountPrice: 15630800,
    discountStartDate: new Date("2025-05-25"),
    discountEndDate: new Date("2025-06-25"),
    price: 15630800,
    quantity: 15,
    commonSpecs: {
      processor: "16 nhân 32 luồng",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 36,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 3 năm",
      },
    },
    variants: [
      {
        sku: "AMD-7950X-BOX",
        price: 16990000,
        stock: 15,
        attributes: {},
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: false,
    tags: ["cpu", "amd", "ryzen", "linh kiện", "desktop"],
    imageURL:
      "https://cdn.tgdd.vn/Products/Images/2088/286256/amd-ryzen-9-7950x-090922-035832-600x600.jpg",
    attributeValues: [
      {
        attribute: (attributesMap) => attributesMap.get("CPU"),
        value: "AMD Ryzen 9 7950X, 16C/32T, 5.7GHz Max Boost",
      },
      {
        attribute: (attributesMap) => attributesMap.get("Cổng kết nối"),
        value: "Socket AM5",
      },
    ],
  },
  {
    name: "Card đồ họa NVIDIA GeForce RTX 4080 Super",
    description:
      "Card đồ họa cao cấp với 16GB VRAM, hỗ trợ ray tracing và DLSS 3.0 cho trải nghiệm gaming tuyệt đỉnh",
    brand: "NVIDIA",
    basePrice: 29990000,
    price: 29990000,
    quantity: 10,
    commonSpecs: {
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 36,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 3 năm",
      },
    },
    variants: [
      {
        sku: "NVIDIA-RTX4080S-FE",
        price: 29990000,
        stock: 5,
        attributes: {
          ram: "16GB GDDR6X",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "ASUS-ROG-RTX4080S",
        price: 32990000,
        stock: 5,
        attributes: {
          ram: "16GB GDDR6X",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["gpu", "nvidia", "rtx", "linh kiện", "gaming"],
    imageURL:
      "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080/geforce-rtx-4080-product-gallery-full-screen-3840-1.jpg",
    attributeValues: [
      {
        attribute: (attributesMap) => attributesMap.get("Card đồ họa"),
        value: "NVIDIA GeForce RTX 4080 Super, 16GB GDDR6X",
      },
      {
        attribute: (attributesMap) => attributesMap.get("Cổng kết nối"),
        value: "HDMI 2.1, DisplayPort 1.4a",
      },
    ],
  },
];

// =============================================
// MAIN SEED FUNCTION
// =============================================

const seedData = async () => {
  try {
    // 1. Xóa dữ liệu cũ
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

    // 2. Thêm attributes
    console.log("Đang tạo thuộc tính sản phẩm...");
    const attributes = await Attribute.insertMany(attributesData);

    // Tạo map để dễ truy cập theo tên
    const attributesMap = new Map();
    attributes.forEach((attr) => {
      attributesMap.set(attr.name, attr._id);
    });
    console.log("Đã tạo thuộc tính sản phẩm");

    // 3. Thêm categories và liên kết với attributes
    console.log("Đang tạo danh mục sản phẩm...");
    const categories = await Category.insertMany(categoriesData);

    // Map categories để dễ truy cập theo tên
    const categoryMap = new Map();
    categories.forEach((cat) => {
      categoryMap.set(cat.name, cat);
    });

    // Liên kết categories với attributes
    // Laptop
    categoryMap.get("Laptop").attributes = [
      attributesMap.get("CPU"),
      attributesMap.get("RAM"),
      attributesMap.get("Bộ nhớ trong"),
      attributesMap.get("Kích thước màn"),
      attributesMap.get("Card đồ họa"),
      attributesMap.get("Hệ điều hành"),
    ];
    await categoryMap.get("Laptop").save();

    // Điện thoại
    categoryMap.get("Điện thoại").attributes = [
      attributesMap.get("CPU"),
      attributesMap.get("RAM"),
      attributesMap.get("Bộ nhớ trong"),
      attributesMap.get("Kích thước màn"),
      attributesMap.get("Camera"),
      attributesMap.get("Dung lượng pin"),
      attributesMap.get("Hệ điều hành"),
    ];
    await categoryMap.get("Điện thoại").save();

    // Máy tính bảng
    categoryMap.get("Máy tính bảng").attributes = [
      attributesMap.get("CPU"),
      attributesMap.get("RAM"),
      attributesMap.get("Bộ nhớ trong"),
      attributesMap.get("Kích thước màn"),
      attributesMap.get("Dung lượng pin"),
      attributesMap.get("Hệ điều hành"),
      attributesMap.get("Kết nối không dây"),
    ];
    await categoryMap.get("Máy tính bảng").save();

    // Thiết bị lưu trữ
    categoryMap.get("Thiết bị lưu trữ").attributes = [
      attributesMap.get("Type"),
      attributesMap.get("Bộ nhớ trong"),
      attributesMap.get("Tốc độ đọc/ghi"),
      attributesMap.get("Cổng kết nối"),
    ];
    await categoryMap.get("Thiết bị lưu trữ").save();

    // Màn hình
    categoryMap.get("Màn hình").attributes = [
      attributesMap.get("Kích thước màn"),
      attributesMap.get("Tần số quét"),
      attributesMap.get("Công nghệ màn hình"),
      attributesMap.get("Cổng kết nối"),
    ];
    await categoryMap.get("Màn hình").save();

    // Linh kiện PC
    categoryMap.get("Linh kiện PC").attributes = [
      attributesMap.get("CPU"),
      attributesMap.get("RAM"),
      attributesMap.get("Cổng kết nối"),
      attributesMap.get("Card đồ họa"),
    ];
    await categoryMap.get("Linh kiện PC").save();
    console.log("Đã tạo và liên kết danh mục sản phẩm");

    // 4. Thêm người dùng
    console.log("Đang tạo tài khoản người dùng...");
    const userPromises = usersData.map(async (userData) => {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      return User.create({
        ...userData,
        password: hashedPassword,
      });
    });

    const users = await Promise.all(userPromises);
    // Map users
    const userMap = new Map();
    users.forEach((user) => {
      userMap.set(user.userName, user);
    });
    console.log("Đã tạo tài khoản người dùng");

    // 6. Thêm sản phẩm
    console.log("Đang tạo sản phẩm mẫu...");
    // Cập nhật products với category IDs và attribute IDs
    const productsToCreate = productsData().map((product) => {
      // Tìm category ID dựa trên tên
      let categoryId;
      if (
        product.name.toLowerCase().includes("laptop") ||
        product.name.toLowerCase().includes("macbook")
      ) {
        categoryId = categoryMap.get("Laptop")._id;
      } else if (
        product.name.toLowerCase().includes("iphone") ||
        product.name.toLowerCase().includes("galaxy s")
      ) {
        categoryId = categoryMap.get("Điện thoại")._id;
      } else if (
        product.name.toLowerCase().includes("ipad") ||
        product.name.toLowerCase().includes("tab")
      ) {
        categoryId = categoryMap.get("Máy tính bảng")._id;
      } else if (
        product.name.toLowerCase().includes("ssd") ||
        product.name.toLowerCase().includes("ổ cứng")
      ) {
        categoryId = categoryMap.get("Thiết bị lưu trữ")._id;
      } else if (product.name.toLowerCase().includes("màn hình")) {
        categoryId = categoryMap.get("Màn hình")._id;
      } else if (
        product.name.toLowerCase().includes("cpu") ||
        product.name.toLowerCase().includes("card")
      ) {
        categoryId = categoryMap.get("Linh kiện PC")._id;
      }

      // Xử lý attributeValues nếu có
      let processedAttributeValues = [];
      if (product.attributeValues) {
        processedAttributeValues = product.attributeValues.map((attrVal) => ({
          attribute:
            typeof attrVal.attribute === "function"
              ? attrVal.attribute(attributesMap)
              : attrVal.attribute,
          value: attrVal.value,
        }));
      }

      return {
        ...product,
        category: categoryId,
        attributeValues: processedAttributeValues,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const products = await Product.insertMany(productsToCreate);
    // Map products
    const productMap = new Map();
    products.forEach((product) => {
      productMap.set(product.name, product);
    });
    console.log("Đã tạo sản phẩm mẫu");

    // 7. Thêm đánh giá cho sản phẩm
    console.log("Đang tạo đánh giá sản phẩm...");
    const reviewsToCreate = [
      {
        product: productMap.get("Laptop Dell XPS 13 (2025)")._id,
        user: userMap.get("nguyenvana")._id,
        username: "Nguyễn Văn A",
        rating: 5,
        comment:
          "Laptop tuyệt vời, hiệu năng mạnh mẽ và màn hình rất đẹp. Pin cũng rất tốt, dùng được cả ngày làm việc.",
        isApproved: true,
        isPurchaseVerified: true,
        createdAt: new Date("2025-05-20"),
      },
      {
        product: productMap.get("Laptop Dell XPS 13 (2025)")._id,
        user: userMap.get("tranthib")._id,
        username: "Trần Thị B",
        rating: 4,
        comment:
          "Máy mỏng nhẹ, thiết kế sang trọng. Chỉ tiếc là không có nhiều cổng kết nối.",
        isApproved: true,
        isPurchaseVerified: true,
        createdAt: new Date("2025-05-25"),
      },
      {
        product: productMap.get("iPhone 15 Pro Max")._id,
        user: userMap.get("nguyenvana")._id,
        username: "Nguyễn Văn A",
        rating: 5,
        comment:
          "Camera xuất sắc, pin dùng được cả ngày dù chơi game nặng. Titanium cầm rất thích tay.",
        isApproved: true,
        isPurchaseVerified: true,
        createdAt: new Date("2025-05-15"),
      },
      {
        product: productMap.get("iPad Pro M3 12.9 inch")._id,
        user: userMap.get("tranthib")._id,
        username: "Trần Thị B",
        rating: 5,
        comment:
          "Màn hình mini-LED thật tuyệt vời, M3 mạnh không kém gì laptop cao cấp. Hỗ trợ Apple Pencil Pro rất mượt.",
        isApproved: true,
        isPurchaseVerified: false,
        createdAt: new Date("2025-06-01"),
      },
      {
        product: productMap.get("SSD Samsung 990 PRO 2TB NVMe")._id,
        user: userMap.get("nguyenvana")._id,
        username: "Nguyễn Văn A",
        rating: 5,
        comment:
          "Tốc độ đọc ghi nhanh đáng kinh ngạc, giá hơi cao nhưng xứng đáng.",
        isApproved: true,
        isPurchaseVerified: true,
        createdAt: new Date("2025-05-10"),
      },
    ];

    await Review.insertMany(reviewsToCreate);
    console.log("Đã tạo đánh giá sản phẩm");

    // 8. Tạo giỏ hàng cho người dùng
    console.log("Đang tạo giỏ hàng...");
    const cartsToCreate = [
      {
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
      },
      {
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
      },
    ];

    await Cart.insertMany(cartsToCreate);
    console.log("Đã tạo giỏ hàng");

    // 9. Tạo đơn hàng mẫu
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
      {
        user: userMap.get("tranthib")._id,
        items: [
          {
            product: productMap.get("iPad Pro M3 12.9 inch")._id,
            variantId: "IPAD-PRO-M3-8-256-WIFI",
            name: "iPad Pro M3 12.9 inch",
            price: 34990000,
            quantity: 1,
            variantInfo: {
              ram: "8GB",
              storage: "256GB",
              connectivity: "WiFi",
              color: "Space Gray",
            },
          },
        ],
        shippingAddress: {
          recipientName: "Trần Thị B",
          recipientPhone: "0978123456",
          streetAndNumber: "789 Trần Hưng Đạo",
          ward: "Phường Cầu Ông Lãnh",
          district: "Quận 1",
          city: "Hồ Chí Minh",
        },
        shippingInfo: {
          provider: "GHN",
          trackingCode: "GHN98765432",
          shippingFee: 0, // Free shipping
          estimatedDeliveryDate: new Date("2025-05-20"),
          actualDeliveryDate: new Date("2025-05-19"),
        },
        itemsAmount: 34990000,
        totalAmount: 34990000,
        paymentMethod: "vnpay_qr",
        status: "Delivered",
        paymentStatus: "completed",
        createdAt: new Date("2025-05-15"),
      },
    ];

    await Order.insertMany(ordersToCreate);
    console.log("Đã tạo đơn hàng mẫu");

    console.log("Seeding dữ liệu hoàn tất!");
    process.exit();
  } catch (error) {
    console.error("Lỗi khi seeding dữ liệu:", error);
    process.exit(1);
  }
};

seedData();

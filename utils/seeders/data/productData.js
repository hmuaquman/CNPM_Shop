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
  // SẢN PHẨM MẪU NGƯỜI DÙNG YÊU CẦU
  {
    name: "MacBook Air M2",
    description:
      "MacBook Air M2 2022 với thiết kế siêu mỏng, hiệu năng vượt trội nhờ chip Apple M2, màn hình Liquid Retina 13.6 inch, pin lâu, phù hợp học tập, làm việc và sáng tạo.",
    brand: "Apple",
    basePrice: 28000000,
    price: 28000000,
    quantity: 10,
    commonSpecs: {
      processor: "Apple M2",
      operatingSystem: "macOS Monterey",
      screenSize: "13.6 inch",
      weight: "1.24 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 1 năm",
      },
    },
    variants: [
      {
        sku: "APPLE-MBAIR-M2-8-256",
        price: 28000000,
        stock: 10,
        attributes: {
          ram: "8GB",
          storage: "256GB SSD",
          color: "Bạc",
        },
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "apple", "macbook", "air", "m2"],
    images: {
      main: ["https://mediamart.vn/images/uploads/data-2022/1-osxI2J.jpg"],
      gallery: [],
    },
    imageURL: "https://mediamart.vn/images/uploads/data-2022/1-osxI2J.jpg",
  },
  {
    name: "MacBook Pro 13 inch 2020",
    description:
      "MacBook Pro 13 inch 2020 trang bị chip Intel/M1, màn hình Retina sắc nét, thời lượng pin lâu, thiết kế nhôm nguyên khối sang trọng.",
    brand: "Apple",
    basePrice: 26000000,
    price: 26000000,
    quantity: 8,
    commonSpecs: {
      processor: "Apple M1 / Intel Core i5",
      operatingSystem: "macOS Big Sur",
      screenSize: "13.3 inch",
      weight: "1.4 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 1 năm",
      },
    },
    variants: [
      {
        sku: "APPLE-MBPRO13-8-256",
        price: 26000000,
        stock: 8,
        attributes: {
          ram: "8GB",
          storage: "256GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "apple", "macbook", "pro", "m1", "2020"],
    images: {
      main: ["https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg"],
      gallery: [],
    },
    imageURL: "https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg",
  },
  {
    name: "ThinkPad X1 Yoga Gen 6 14inch - 2021 - New Outlet / Refurbised Core I7 1165G7 16 GB 512GB FHD+",
    description:
      "Laptop doanh nhân cao cấp, xoay gập 360 độ, màn hình cảm ứng 14 inch FHD+, CPU Intel Core i7-1165G7, RAM 16GB, SSD 512GB, trọng lượng nhẹ, bảo mật cao.",
    brand: "Lenovo",
    basePrice: 24500000,
    price: 24500000,
    quantity: 7,
    commonSpecs: {
      processor: "Intel Core i7-1165G7",
      operatingSystem: "Windows 11 Pro",
      screenSize: "14 inch",
      weight: "1.39 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 1 năm",
      },
    },
    variants: [
      {
        sku: "LENOVO-X1YOGA-G6-I7-16-512",
        price: 24500000,
        stock: 7,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "lenovo", "thinkpad", "x1 yoga", "14inch", "2021"],
    images: {
      main: ["https://5.imimg.com/data5/SELLER/Default/2023/5/305487983/CN/HU/WN/3137124/lenovo-yoga-slim-7pro-intel-evo-i7-500x500.jpg"],
      gallery: [],
    },
    imageURL: "https://5.imimg.com/data5/SELLER/Default/2023/5/305487983/CN/HU/WN/3137124/lenovo-yoga-slim-7pro-intel-evo-i7-500x500.jpg",
  },
  {
    name: "Lenovo ThinkPad P15 Gen 1 (Core i7-10750H, RAM 16GB, SSD 512GB, Quadro T1000, Màn 15,6'' FHD)",
    description:
      "Laptop workstation mạnh mẽ, màn hình 15.6 inch FHD, CPU Intel Core i7-10750H, RAM 16GB, SSD 512GB, card đồ họa Quadro T1000, phù hợp đồ họa kỹ thuật.",
    brand: "Lenovo",
    basePrice: 35500000,
    price: 35500000,
    quantity: 5,
    commonSpecs: {
      processor: "Intel Core i7-10750H",
      operatingSystem: "Windows 10 Pro",
      screenSize: "15.6 inch",
      weight: "2.87 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 1 năm",
      },
    },
    variants: [
      {
        sku: "LENOVO-P15-G1-I7-16-512",
        price: 35500000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "lenovo", "thinkpad", "p15", "quadro", "workstation"],
    images: {
      main: ["https://laptopkhanhtran.vn/pic/product/Thinkpad__638544811261910117_HasThumb.JPG"],
      gallery: [],
    },
    imageURL: "https://laptopkhanhtran.vn/pic/product/Thinkpad__638544811261910117_HasThumb.JPG",
  },
  {
    name: "Laptop MSI Titan 18 HX AI A2XWJG 622VN | CPU Ultra 9-285HX | RAM 64GB DDR5 | SSD 6TB PCIe | VGA RTX 5090 24GB | 18.0 UHD 4K MiniLED IPS, 100% DCI-P3 & 120Hz | Win11 ",
    description:
      "Laptop gaming cao cấp nhất của MSI, màn hình 18 inch UHD 4K MiniLED, CPU Ultra 9-285HX, RAM 64GB, SSD 6TB, VGA RTX 5090 24GB, tần số quét 120Hz, chuẩn màu 100% DCI-P3.",
    brand: "MSI",
    basePrice: 180000000,
    price: 180000000,
    quantity: 2,
    commonSpecs: {
      processor: "Intel Ultra 9-285HX",
      operatingSystem: "Windows 11 Pro",
      screenSize: "18.0 inch UHD 4K MiniLED",
      weight: "3.6 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 2 năm",
      },
    },
    variants: [
      {
        sku: "MSI-TITAN18HX-U9-64-6TB",
        price: 180000000,
        stock: 2,
        attributes: {
          ram: "64GB",
          storage: "6TB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "msi", "titan", "gaming", "rtx5090", "18inch"],
    images: {
      main: ["https://bizweb.dktcdn.net/thumb/large/100/386/607/products/msi-titan-18-hx-man-hinh-8170297d-6352-42f7-b57d-01c4870a88b4-ae5f8fac-fa78-458b-8e9c-cd6c1f742afc.jpg?v=1741838175607"],
      gallery: [],
    },
    imageURL: "https://bizweb.dktcdn.net/thumb/large/100/386/607/products/msi-titan-18-hx-man-hinh-8170297d-6352-42f7-b57d-01c4870a88b4-ae5f8fac-fa78-458b-8e9c-cd6c1f742afc.jpg?v=1741838175607",
  },
  {
    name: "Laptop Asus ROG Zephyrus G16 GU605MI U9.4070 | CPU Ultra 9-185H | RAM 16GB LPDDR5x | SSD 1TB PCIe | VGA RTX 4070 8GB | 16.0 QHD 2K5 OLED, 100% DCI-P3 & 240Hz | Win11 ",
    description:
      "Laptop gaming mỏng nhẹ, màn hình 16 inch QHD OLED 2K5, CPU Ultra 9-185H, RAM 16GB, SSD 1TB, VGA RTX 4070 8GB, tần số quét 240Hz, chuẩn màu 100% DCI-P3.",
    brand: "Asus",
    basePrice: 62000000,
    price: 62000000,
    quantity: 4,
    commonSpecs: {
      processor: "Intel Ultra 9-185H",
      operatingSystem: "Windows 11 Home",
      screenSize: "16.0 inch QHD 2K5 OLED",
      weight: "1.85 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành phần cứng 2 năm",
      },
    },
    variants: [
      {
        sku: "ASUS-G16-U9-16-1TB",
        price: 62000000,
        stock: 4,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "asus", "rog", "zephyrus", "g16", "rtx4070", "oled"],
    images: {
      main: ["https://bizweb.dktcdn.net/thumb/large/100/372/934/products/asus-rog-zephyrus-g16-gu605-man-hinh-d8052896-688e-4c72-9107-374cdebcf937.jpg?v=1748017176580"],
      gallery: [],
    },
    imageURL: "https://bizweb.dktcdn.net/thumb/large/100/372/934/products/asus-rog-zephyrus-g16-gu605-man-hinh-d8052896-688e-4c72-9107-374cdebcf937.jpg?v=1748017176580",
  },

  // ĐIỆN THOẠI
  {
    name: "iPhone 15 Pro Max",
    description:
      "Điện thoại cao cấp mới nhất của Apple với thiết kế Titanium, camera 48MP và chip A17 Pro",
    brand: "Apple",
    basePrice: 34990000,
    discountPercentage: 5,
    price: 33240500,
    discountStartDate: new Date("2025-06-01"),
    discountEndDate: new Date("2025-06-30"),
    quantity: 25,
    commonSpecs: {
      processor: "A17 Pro",
      operatingSystem: "iOS 17",
      screenSize: "6.7 inch",
      weight: "221g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Phần cứng, 1 đổi 1 trong 30 ngày",
      },
    },
    variants: [
      {
        sku: "IP15PM-256-TITAN",
        price: 33240500,
        stock: 10,
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
        price: 38240500,
        stock: 8,
        attributes: {
          storage: "512GB",
          color: "Titan Đen",
          ram: "8GB",
        },
        status: "active",
      },
      {
        sku: "IP15PM-256-BLUE",
        price: 33240500,
        stock: 7,
        attributes: {
          storage: "256GB",
          color: "Xanh Titan",
          ram: "8GB",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["điện thoại", "iphone", "apple", "sang trọng", "cao cấp"],
    imageURL:
      "https://cdn.viettelstore.vn/Images/Product/ProductImage/578590019.jpeg",
  },
  // MÁY TÍNH BẢNG
  {
    name: "iPad Pro M3 12.9 inch",
    description:
      "Máy tính bảng mạnh mẽ với chip M3, màn hình mini-LED và tính năng siêu mượt",
    brand: "Apple",
    basePrice: 34990000,
    price: 34990000,
    quantity: 12,
    commonSpecs: {
      processor: "Apple M3",
      operatingSystem: "iPadOS 17",
      screenSize: "12.9 inch",
      weight: "682g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
      },
    },
    variants: [
      {
        sku: "IPAD-PRO-M3-8-256-WIFI",
        price: 34990000,
        stock: 5,
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
        price: 38990000,
        stock: 4,
        attributes: {
          ram: "8GB",
          storage: "512GB",
          connectivity: "WiFi",
          color: "Space Gray",
        },
        status: "active",
      },
      {
        sku: "IPAD-PRO-M3-8-256-CELL",
        price: 39990000,
        stock: 3,
        attributes: {
          ram: "8GB",
          storage: "256GB",
          connectivity: "WiFi + Cellular",
          color: "Space Gray",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["tablet", "ipad", "apple", "m3", "cao cấp"],
    imageURL:
      "https://cdn.viettelstore.vn/Images/Product/ProductImage/1896905048.jpeg",
  },
  // THIẾT BỊ LƯU TRỮ
  {
    name: "SSD Samsung 990 PRO 2TB NVMe",
    description:
      "Ổ cứng SSD NVMe siêu tốc với tốc độ đọc/ghi lên đến 7450/6900 MB/s",
    brand: "Samsung",
    basePrice: 5990000,
    price: 5990000,
    quantity: 30,
    commonSpecs: {
      interfaceType: "PCIe 4.0 x4, NVMe 2.0",
      readSpeed: "7450 MB/s",
      writeSpeed: "6900 MB/s",
      dimensions: "80 x 22 x 2.3 mm",
      warrantyInfo: {
        durationInMonths: 60,
        type: "Bảo hành tại hãng",
        coverage: "5 năm hoặc giới hạn TBW",
      },
    },
    variants: [
      {
        sku: "SS-990PRO-2TB",
        price: 5990000,
        stock: 15,
        attributes: {
          storage: "2TB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "SS-990PRO-1TB",
        price: 3690000,
        stock: 15,
        attributes: {
          storage: "1TB",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: false,
    tags: ["ssd", "nvme", "lưu trữ", "thiết bị", "nhanh"],
    imageURL:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/mz-v9p2t0bw/gallery/vn-990-pro-with-heatsink-mz-v9p2t0bw-533188584?$684_547_PNG$",
  },
];

module.exports = productsData;

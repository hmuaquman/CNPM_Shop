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
    name: "Laptop Gaming Acer Nitro V",
    description:
      "Laptop mang một thiết kế gaming mạnh mẽ, màn hình 15.6” 144Hz FHD, cấu hình cân mọi tựa game với chip i5-13420H/ i7-13620H  từ Intel",
    brand: "Acer",
    basePrice: 16990000,
    price: 16990000 ,
    quantity: 35,
    commonSpecs: {
      processor: "Intel Core i5-13420H/ i7-13620H",
      operatingSystem: "Windows 11 Home",
      screenSize: "15.6 inch",
      weight: "2.11 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 2 năm, hỗ trợ 1 đổi 1 trong 7 ngày",
      },
    },
    variants: [
      {
        sku: "Acer Nitro V ANV15-51-58AN",
        price: 16990000,
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
        sku: "Acer Nitro V ANV15-51-72VS",
        price: 19990000,
        stock: 7,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        status: "active",
      },
      {
        sku: "Acer Nitro V ANV15-51-57B2, RTX 4050",
        price: 23390000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        status: "active",
      },
      {
        sku: "Acer Nitro V ANV15-51-55CA, RTX 4050",
        price: 24190000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        status: "active",
      },
      {
        sku: "Acer Nitro V ANV15-51-75GS, RTX 4050",
        price: 28990000,
        stock: 4,
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
    tags: ["laptop", "acer", "gaming", "Intel", "nitro"],
    imageURL:
      "https://product.hstatic.net/200000722513/product/nitro-v_755588bd95514b6386940d73d3951e2d_1024x1024.png",
  },
  {
    name: "Laptop Lenovo LOQ 15IAX9",
    description:
      "Laptop trang bị bộ xử lý Intel Core i5-12450HX, mang lại khả năng xử lý mạnh mẽ cho các tác vụ đa nhiệm và chơi game",
    brand: "Lenovo",
    basePrice: 18490000,
    price: 18490000 ,
    quantity: 15,
    commonSpecs: {
      processor: "Intel Core i5-12450HX",
      operatingSystem: "Windows 11 Home",
      screenSize: "15.6 inch",
      weight: "2.38 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành trong 24 tháng, hỗ trợ mới trong 7 ngày",
      },
    },
    variants: [
      {
        sku: "Lenovo LOQ 15IAX9E 83LK0036VN, RTX 3050",
        price: 18490000,
        stock: 5,
        attributes: {
          ram: "12GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Lenovo LOQ 15IAX9 83GS001SVN, RTX 2050",
        price: 19290000,
        stock: 5,
        attributes: {
          ram: "12GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Lenovo LOQ 15IAX9 83GS001RVN, RTX 3050",
        price: 19490000,
        stock: 5,
        attributes: {
          ram: "12GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },

    ],
    status: "active",
    featured: true,
    tags: ["laptop", "lenovo", "gaming", "Intel", "LOQ"],
    imageURL:
      "https://cdn.tgdd.vn/Products/Images/44/328139/lenovo-loq-15iax9-i5-83gs001svn-thumb-600x600.jpg",
  },
  {
    name: "Laptop MSI Modern",
    description:
      "Thuộc phân khúc laptop học tập, văn phòng với trọng lượng cực mỏng nhẹ chỉ 1.4 kg",
    brand: "MSI",
    basePrice: 11590000,
    price: 11590000 ,
    quantity: 22,
    commonSpecs: {
      processor: "Intel Core i5-1235U",
      operatingSystem: "Windows 11 Home",
      screenSize: "14 inch",
      weight: "1.4 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 36,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành đến 36 tháng",
      },
    },
    variants: [
      {
        sku: "MSI Modern 14 C12MO-660VN",
        price: 11590000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "MSI Modern 15 B13M-438VN",
        price: 11990000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "MSI Modern 14 C13M-608VN",
        price: 12790000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "MSI Modern 14 C13M-607VN, i7-1355U",
        price: 15690000,
        stock: 6,
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
    tags: ["laptop", "MSI", "mỏng nhẹ", "Intel", "Modern"],
    imageURL:
      "https://cdn.tgdd.vn/Products/Images/44/304539/msi-modern-14-c11m-i3-011vn-040523-124356-600x600.jpg",
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

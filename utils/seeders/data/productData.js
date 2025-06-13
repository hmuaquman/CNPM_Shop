const productsData = () => [
  // LAPTOP
  {
    name: "Laptop Dell XPS 13 (2025)",
    description:
      "Laptop cao cấp với màn hình 13 inch, thiết kế mỏng nhẹ, hiệu năng mạnh mẽ với chip Intel thế hệ mới nhất",
    brand: "Dell",
    basePrice: 32000000,
    //discountPercentage: 10,
    //discountPrice: 28800000,
    //discountStartDate: new Date("2025-05-20"),
    //discountEndDate: new Date("2025-06-20"),
    price: 32000000,
    quantity: 40,
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
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Bạc",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-512",
        price: 33500000,
        stock: 5,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Bạc",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-512",
        price: 33000000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Bạc",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-1TB",
        price: 34500000,
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
        price: 32000000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-512",
        price: 33500000,
        stock: 5,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-512",
        price: 33000000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "DELL-XPS13-I7-32-1TB",
        price: 34500000,
        stock: 5,
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
    tags: ["laptop", "dell", "mỏng nhẹ", "cao cấp", "xps"],
    imageURL:
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9320/media-gallery/xs9320t-cnb-00000ff090-sl.psd?fmt=pjpg&pscan=auto&scl=1&wid=3319&hei=2405&qlt=100,0&resMode=sharp2&size=3319,2405",
  },
  {
    name: "Laptop ASUS ROG Strix G15 G513QR-HQ264T",
    description:
      "Laptop gaming mạnh mẽ dành riêng cho game thủ với thiết kế độc đáo cùng hiệu năng vượt trội.",
    brand: "Asus",
    basePrice: 39590000,
    price: 39590000,
    quantity: 23,
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
        sku: "ASUS ROG Strix G15 G513QR-HQ264T",
        price: 39590000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "ASUS ROG Strix G15 G513QR-HQ264T",
        price: 40590000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        status: "active",
      },
      {
        sku: "ASUS ROG Strix G15 G513QR-HQ264T",
        price: 41090000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        status: "active",
      },
      {
        sku: "ASUS ROG Strix G15 G513QR-HQ264T",
        price: 42090000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "asus", "gaming", "rog", "ryzen"],
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-strix-g15-g513qr-hq264t-r9-5900hx-3_a4eff41c56f64ef99fe4055a5b2276bf_grande.png",
  },
  {
    name: "Laptop ASUS Gaming Rog Strix G15 G513IH HN015W",
    description:
      "chiếc laptop có cấu hình mạnh mẽ, hệ thống tản nhiệt cao cấp, đáp ứng được hầu hết các tựa game trên thị trường hiện nay",
    brand: "Asus",
    basePrice: 17890000,
    price: 17890000,
    quantity: 26,
    commonSpecs: {
      processor: "AMD Ryzen 7 4800H",
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
        sku: "ASUS Gaming Rog Strix G15 G513IH HN015W",
        price: 17890000,
        stock: 7,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "ASUS Gaming Rog Strix G15 G513IH HN015W",
        price: 18890000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        status: "active",
      },
      {
        sku: "ASUS Gaming Rog Strix G15 G513IH HN015W",
        price: 19390000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        status: "active",
      },
      {
        sku: "ASUS Gaming Rog Strix G15 G513IH HN015W",
        price: 20390000,
        stock: 7,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "asus", "gaming", "rog", "ryzen"],
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/_/2_64_37.jpg",
  },
  {
    name: "Laptop Gaming Acer Nitro V ANV15-51-58AN",
    description:
      "Laptop mang một thiết kế gaming mạnh mẽ, màn hình 15.6” 144Hz FHD, cấu hình cân mọi tựa game với chip i5-13420H từ Intel",
    brand: "Acer",
    basePrice: 16990000,
    price: 16990000 ,
    quantity: 25,
    commonSpecs: {
      processor: "Intel Core i5-13420H",
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
        price: 17890000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Acer Nitro V ANV15-51-58AN",
        price: 18890000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        status: "active",
      },
      {
        sku: "Acer Nitro V ANV15-51-58AN",
        price: 19390000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        status: "active",
      },
      {
        sku: "Acer Nitro V ANV15-51-58AN",
        price: 20390000,
        stock: 7,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Xám",
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
    name: "Laptop Acer Gaming Nitro Lite 16 NL16-71G-71UJ",
    description:
      "Laptop sở hữu CPU Intel Core i7-13620H mạnh mẽ, hỗ trợ xử lý nhanh mọi tác vụ từ chơi game đến thiết kế đồ họa",
    brand: "Acer",
    basePrice: 23490000,
    price: 23490000 ,
    quantity: 24,
    commonSpecs: {
      processor: "Intel Core i7-13620H",
      operatingSystem: "Windows 11 Home",
      screenSize: "16 inch",
      weight: "1.95 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành 2 năm, hỗ trợ 1 đổi 1 trong 7 ngày",
      },
    },
    variants: [
      {
        sku: "Laptop Acer Gaming Nitro Lite 16 NL16-71G-71UJ",
        price: 23490000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "512GB SSD",
          color: "Trắng",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Laptop Acer Gaming Nitro Lite 16 NL16-71G-71UJ",
        price: 24490000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Trắng",
        },
        status: "active",
      },
      {
        sku: "Laptop Acer Gaming Nitro Lite 16 NL16-71G-71UJ",
        price: 24990000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Trắng",
        },
        status: "active",
      },
      {
        sku: "Laptop Acer Gaming Nitro Lite 16 NL16-71G-71UJ",
        price: 25990000,
        stock: 7,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Trắng",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["laptop", "acer", "gaming", "Intel", "nitro"],
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_12__8_35.png",
  },
  {
    name: "Laptop Lenovo LOQ 15IAX9E 83LK0036VN",
    description:
      "Laptop trang bị bộ xử lý Intel Core i5-12450HX, mang lại khả năng xử lý mạnh mẽ cho các tác vụ đa nhiệm và chơi game",
    brand: "Lenovo",
    basePrice: 17990000,
    price: 17990000 ,
    quantity: 10,
    commonSpecs: {
      processor: "Intel Core i5-12450HX",
      operatingSystem: "Windows 11 Home",
      screenSize: "15.6 inch",
      weight: "1.77 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành trong 24 tháng, hỗ trợ mới trong 7 ngày",
      },
    },
    variants: [
      {
        sku: "Laptop Lenovo LOQ 15IAX9E 83LK0036VN",
        price: 17990000,
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
        sku: "Laptop Lenovo LOQ 15IAX9E 83LK0036VN",
        price: 18990000,
        stock: 5,
        attributes: {
          ram: "12GB",
          storage: "1TB SSD",
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
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_2__7_30.png",
  },
  {
    name: "Laptop Lenovo LOQ 15ARP9 83JC007JVN",
    description:
      "Chiếc laptop mang lại hiệu năng mạnh mẽ với bộ đôi Ryzen 5 7235HS - RTX 3050 6GB cùng 24GB RAM đảm bảo hiệu suất siêu cao",
    brand: "Lenovo",
    basePrice: 20490000,
    price: 20490000 ,
    quantity: 10,
    commonSpecs: {
      processor: "AMD Ryzen 5 7235HS",
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
        sku: "Laptop Lenovo LOQ 15ARP9 83JC007JVN",
        price: 20490000,
        stock: 5,
        attributes: {
          ram: "24GB",
          storage: "512GB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Laptop Lenovo LOQ 15ARP9 83JC007JVN",
        price: 21490000,
        stock: 5,
        attributes: {
          ram: "24GB",
          storage: "1TB SSD",
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
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_11__5_77.png",
  },
  {
    name: "Laptop MSI Modern 14 C12MO-660VN",
    description:
      "Thuộc phân khúc laptop học tập, văn phòng với trọng lượng cực mỏng nhẹ chỉ 1.4 kg",
    brand: "MSI",
    basePrice: 11590000,
    price: 11590000 ,
    quantity: 23,
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
        sku: "Laptop MSI Modern 14 C12MO-660VN",
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
        sku: "Laptop MSI Modern 14 C12MO-660VN",
        price: 12590000,
        stock: 5,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Laptop MSI Modern 14 C12MO-660VN",
        price: 13090000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "512GB SSD",
          color: "Đen",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Laptop MSI Modern 14 C12MO-660VN",
        price: 14090000,
        stock: 6,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
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
  {
    name: "Laptop MSI Prestige 14 AI Studio C1UDXG-058VN",
    description:
      "Chiếc laptop nổi bật với bộ xử lý Intel Core Ultra 7-155H cùng khả năng hỗ trợ đồ họa mạnh mẽ từ GPU GeForce RTX 3050",
    brand: "MSI",
    basePrice: 26190000,
    price: 26190000 ,
    quantity: 11,
    commonSpecs: {
      processor: "Intel Core Ultra 7 155H 16 lõi",
      operatingSystem: "Windows 11 Home",
      screenSize: "14 inch",
      weight: "1.7 kg",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 36,
        type: "Bảo hành tại hãng",
        coverage: "Bảo hành đến 36 tháng",
      },
    },
    variants: [
      {
        sku: "Laptop MSI Prestige 14 AI Studio C1UDXG-058VN",
        price: 26190000,
        stock: 6,
        attributes: {
          ram: "16GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Laptop MSI Prestige 14 AI Studio C1UDXG-058VN",
        price: 27690000,
        stock: 5,
        attributes: {
          ram: "32GB",
          storage: "1TB SSD",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },

    ],
    status: "active",
    featured: true,
    tags: ["laptop", "MSI", "mỏng nhẹ", "Intel", "Prestige"],
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
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTJoIdsOT417kmu5gZu2nZz6zdNTiEXRr0iaheN_mJqbq_3VTgDo-A0UL7x1aIS563umE_xZDzOqXgV69Vjz4sEELUDwr61N2BbxEAr7flgN3l6Dpiyv02yr0prZi26GvY26SJ1NA&usqp=CAc",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Điện thoại Samsung S24 Ultra sở hữu AI thông minh, hiệu năng cực đỉnh cũng đa tính năng cao cấp nhất",
    brand: "Samsung",
    basePrice: 23990000,
    //discountPercentage: 5,
    price: 23990000,
    //discountStartDate: new Date("2025-06-01"),
    //discountEndDate: new Date("2025-06-30"),
    quantity: 45,
    commonSpecs: {
      processor: "Snapdragon 8 Gen 3 For Galaxy",
      operatingSystem: "Android 14, One UI 6.1",
      screenSize: "6.8 inch",
      weight: "232g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
        coverage: "Có hiệu lực sáu (06) tháng tính từ ngày kích hoạt bảo hành",
      },
    },
    variants: [
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 23990000,
        stock: 5,
        attributes: {
          storage: "256GB",
          color: "Đen",
          ram: "12GB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 25990000,
        stock: 5,
        attributes: {
          storage: "512GB",
          color: "Đen",
          ram: "12GB",
        },
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 44490000,
        stock: 5,
        attributes: {
          storage: "1TB",
          color: "Đen",
          ram: "12GB",
        },
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 23990000,
        stock: 5,
        attributes: {
          storage: "256GB",
          color: "Xám",
          ram: "12GB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 25990000,
        stock: 5,
        attributes: {
          storage: "512GB",
          color: "Xám",
          ram: "12GB",
        },
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 44490000,
        stock: 5,
        attributes: {
          storage: "1TB",
          color: "Xám",
          ram: "12GB",
        },
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 23990000,
        stock: 5,
        attributes: {
          storage: "256GB",
          color: "Tím",
          ram: "12GB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 25990000,
        stock: 5,
        attributes: {
          storage: "512GB",
          color: "Tím",
          ram: "12GB",
        },
        status: "active",
      },
      {
        sku: "Samsung Galaxy S24 Ultra",
        price: 44490000,
        stock: 5,
        attributes: {
          storage: "1TB",
          color: "Tím",
          ram: "12GB",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: true,
    tags: ["điện thoại", "Samsung", "Android", "sang trọng", "cao cấp"],
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-timultra-22_2.png",
  },
  {
    name: "Xiaomi 14T Pro",
    description:
      "Là một trong những mẫu smartphone cao cấp được mong đợi, được đánh giá mang nhiều cải tiến đáng giá, đặc biệt là trong hiệu năng và thiết kế của sản phẩm",
    brand: "Xiaomi",
    basePrice: 16990000,
    //discountPercentage: 5,
    price: 16990000,
    //discountStartDate: new Date("2025-06-01"),
    //discountEndDate: new Date("2025-06-30"),
    quantity: 25,
    commonSpecs: {
      processor: "MediaTek Dimensity 9300+",
      operatingSystem: "Xiaomi HyperOS (Android 14)",
      screenSize: "6.67 inch",
      weight: "209g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 24,
        type: "Bảo hành tại hãng",
        coverage: "24 tháng cho sản phẩm chính (điện thoại) và 12 tháng cho phụ kiện đi kèm (củ sạc, cáp, tai nghe...)",
      },
    },
    variants: [
      {
        sku: "Xiaomi 14T Pro",
        price: 16990000,
        stock: 10,
        attributes: {
          storage: "512GB",
          color: "Đen",
          ram: "12GB",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "Xiaomi 14T Pro",
        price: 16990000,
        stock: 8,
        attributes: {
          storage: "512GB",
          color: "Xám",
          ram: "12GB",
        },
        status: "active",
      },
      {
        sku: "Xiaomi 14T Pro",
        price: 16990000,
        stock: 7,
        attributes: {
          storage: "512TB",
          color: "Xanh",
          ram: "12GB",
        },
        status: "active",
      },
      
    ],
    status: "active",
    featured: true,
    tags: ["điện thoại", "Xiaomi", "Android", "sang trọng", "cao cấp"],
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t_pro_2_.png",
  },
  // MÁY TÍNH BẢNG
  {
    name: "iPad Pro M4 11 inch",
    description:
      "Máy tính bảng mạnh mẽ với chip M4, màn hình mini-LED và tính năng siêu mượt",
    brand: "Apple",
    basePrice: 34990000,
    price: 34990000,
    quantity: 12,
    commonSpecs: {
      processor: "Apple M4",
      operatingSystem: "iPadOS 17",
      screenSize: "11 inch",
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
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_100_1_2__3.png",
  },
  {
    name: "Huawei MatePad (Papermatte) 11.5 inch 2025 8GB 256GB - Kèm bàn phím",
    description:
      "Huawei Matepad 11.5 hỗ trợ hiển thị hình ảnh chất lượng cao với độ phân giải 2200 x 1440 pixel trên màn hình TFT LCD 11.5 inches 120Hz",
    brand: "Huawei",
    basePrice: 8990000,
    price: 8990000,
    quantity: 25,
    commonSpecs: {
      processor: "KirinT80, Octa-core",
      operatingSystem: "HarmonyOS 4.2",
      screenSize: "11.5 inch",
      weight: "649g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
      },
    },
    variants: [
      {
        sku: "MatePad",
        price: 8990000,
        stock: 14,
        attributes: {
          ram: "8GB",
          storage: "256GB",
          version: "MatePad",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "MatePad S",
        price: 11990000,
        stock: 11,
        attributes: {
          ram: "8GB",
          storage: "256GB",
          version: "MatePad S",
          color: "Xám",
        },
        status: "active",
      },

    ],
    status: "active",
    featured: true,
    tags: ["tablet", "ipad", "huawei", "matepad", "cao cấp"], 
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/may-tinh-bang-huawei-matepad-11-5-s_42_.png",
  },
  {
    name: "Máy tính bảng Lenovo Idea Tab Pro ZAE40190VN",
    description:
      "Máy tính bảng Lenovo Idea Tab Pro kèm bút, bàn phím trang bị vi xử lý MediaTek Dimensity 8300 với thiết kế 4nm mạnh mẽ, đi kèm bộ nhớ lên đến 256GB",
    brand: "Lenovo",
    basePrice: 11490000,
    price: 11490000,
    quantity: 17,
    commonSpecs: {
      processor: "MediaTek Dimensity 8300",
      operatingSystem: "Android 14",
      screenSize: "12.7 inch",
      weight: "620g",
      origin: "Chính hãng",
      warrantyInfo: {
        durationInMonths: 12,
        type: "Bảo hành tại hãng",
      },
    },
    variants: [
      {
        sku: "Lenovo Idea Tab Pro ZAE40190VN",
        price: 11490000,
        stock: 17,
        attributes: {
          ram: "8GB",
          storage: "256GB",
          color: "Xám",
        },
        isDefault: true,
        status: "active",
      },

    ],
    status: "active",
    featured: true,
    tags: ["tablet", "ipad", "lenovo", "cao cấp"], 
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/may-tinh-bang-lenovo-idea-tab-pro-kem-but-ban-phim_1_.png",
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
  {
    name: "Ổ cứng di động SSD ADATA SC750 USB 3.2 Gen 2",
    description:
      "Ổ cứng di động SSD Adata SC750 USB 3.2 Gen2 nổi bật với tốc độ đọc/ghi cao lên đến 1050 và 1000 MB/s",
    brand: "ADATA",
    basePrice: 1190000,
    price: 1190000,
    quantity: 30,
    commonSpecs: {
      readSpeed: "1050 MB/s",
      writeSpeed: "1000 MB/s",
      warrantyInfo: {
        durationInMonths: 60,
        type: "Bảo hành tại hãng",
        coverage: "5 năm hoặc giới hạn TBW",
      },
    },
    variants: [
      {
        sku: "SSD ADATA SC750 USB 3.2 Gen 2",
        price: 1190000,
        stock: 15,
        attributes: {
          storage: "500B",
        },
        isDefault: true,
        status: "active",
      },
      {
        sku: "SSD ADATA SC750 USB 3.2 Gen 2",
        price: 1990000,
        stock: 15,
        attributes: {
          storage: "1TB",
        },
        status: "active",
      },
      {
        sku: "SSD ADATA SC750 USB 3.2 Gen 2",
        price: 3790000,
        stock: 15,
        attributes: {
          storage: "2TB",
        },
        status: "active",
      },
    ],
    status: "active",
    featured: false,
    tags: ["ssd", "nvme", "lưu trữ", "thiết bị", "nhanh"],
    imageURL:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__6_104_1_1.png",
  },
];

module.exports = productsData;

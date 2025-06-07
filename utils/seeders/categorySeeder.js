const Category = require("../../models/Category");

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
  {
    name: "Thiết bị lưu trữ",
    description: "Ổ cứng SSD, HDD, thẻ nhớ và USB",
  },
  {
    name: "Màn hình",
    description: "Màn hình máy tính với nhiều kích thước và độ phân giải",
  },
  {
    name: "Linh kiện PC",
    description: "Các linh kiện để nâng cấp hoặc tự build PC",
  },
];

const categoryAttributes = {
  Laptop: [
    "CPU",
    "RAM",
    "Bộ nhớ trong",
    "Kích thước màn",
    "Card đồ họa",
    "Hệ điều hành",
  ],
  "Điện thoại": [
    "CPU",
    "RAM",
    "Bộ nhớ trong",
    "Kích thước màn",
    "Camera",
    "Dung lượng pin",
    "Hệ điều hành",
  ],
  "Máy tính bảng": [
    "CPU",
    "RAM",
    "Bộ nhớ trong",
    "Kích thước màn",
    "Dung lượng pin",
    "Hệ điều hành",
    "Kết nối không dây",
  ],
  "Thiết bị lưu trữ": [
    "Type",
    "Bộ nhớ trong",
    "Tốc độ đọc/ghi",
    "Cổng kết nối",
  ],
  "Màn hình": [
    "Kích thước màn",
    "Tần số quét",
    "Công nghệ màn hình",
    "Cổng kết nối",
  ],
  "Linh kiện PC": ["CPU", "RAM", "Cổng kết nối", "Card đồ họa"],
};

const seedCategories = async (attributesMap) => {
  console.log("Đang tạo danh mục sản phẩm...");
  const categories = await Category.insertMany(categoriesData);

  // Map categories để dễ truy cập theo tên
  const categoryMap = new Map();
  categories.forEach((cat) => {
    categoryMap.set(cat.name, cat);
  });

  // Liên kết categories với attributes
  for (const [categoryName, attributeNames] of Object.entries(
    categoryAttributes
  )) {
    const category = categoryMap.get(categoryName);
    category.attributes = attributeNames.map((name) => attributesMap.get(name));
    await category.save();
  }

  console.log("Đã tạo và liên kết danh mục sản phẩm");
  return categoryMap;
};

module.exports = seedCategories;

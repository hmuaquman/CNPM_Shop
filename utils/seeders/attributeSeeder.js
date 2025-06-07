const Attribute = require("../../models/Attribute");

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

const seedAttributes = async () => {
  console.log("Đang tạo thuộc tính sản phẩm...");
  const attributes = await Attribute.insertMany(attributesData);

  // Tạo map để dễ truy cập theo tên
  const attributesMap = new Map();
  attributes.forEach((attr) => {
    attributesMap.set(attr.name, attr._id);
  });

  console.log("Đã tạo thuộc tính sản phẩm");
  return attributesMap;
};

module.exports = seedAttributes;

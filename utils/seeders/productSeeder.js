const Product = require("../../models/Product");
const productsData = require("./data/productData");

const seedProducts = async (categoryMap, attributesMap) => {
  console.log("Đang tạo sản phẩm mẫu...");

  // Xử lý dữ liệu sản phẩm và thêm liên kết
  const productsToCreate = productsData().map((product) => {
    // Tìm category ID dựa trên tên danh mục
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

  // Map products theo tên để dễ truy cập
  const productMap = new Map();
  products.forEach((product) => {
    productMap.set(product.name, product);
  });

  console.log("Đã tạo sản phẩm mẫu");
  return productMap;
};

module.exports = seedProducts;

const Review = require("../../models/Review");

const seedReviews = async (userMap, productMap) => {
  console.log("Đang tạo đánh giá sản phẩm...");

  // Danh sách các đánh giá muốn tạo
  const reviewsData = [
    {
      productName: "Laptop Dell XPS 13 (2025)",
      userName: "nguyenvana",
      username: "Nguyễn Văn A",
      rating: 5,
      comment:
        "Laptop tuyệt vời, hiệu năng mạnh mẽ và màn hình rất đẹp. Pin cũng rất tốt, dùng được cả ngày làm việc.",
      isApproved: true,
      isPurchaseVerified: true,
      createdAt: new Date("2025-05-20"),
    },
    {
      productName: "Laptop Dell XPS 13 (2025)",
      userName: "tranthib",
      username: "Trần Thị B",
      rating: 4,
      comment:
        "Máy mỏng nhẹ, thiết kế sang trọng. Chỉ tiếc là không có nhiều cổng kết nối.",
      isApproved: true,
      isPurchaseVerified: true,
      createdAt: new Date("2025-05-25"),
    },
    {
      productName: "iPhone 15 Pro Max",
      userName: "nguyenvana",
      username: "Nguyễn Văn A",
      rating: 5,
      comment:
        "Camera xuất sắc, pin dùng được cả ngày dù chơi game nặng. Titanium cầm rất thích tay.",
      isApproved: true,
      isPurchaseVerified: true,
      createdAt: new Date("2025-05-15"),
    },
    {
      productName: "iPad Pro M3 12.9 inch",
      userName: "tranthib",
      username: "Trần Thị B",
      rating: 5,
      comment:
        "Màn hình mini-LED thật tuyệt vời, M3 mạnh không kém gì laptop cao cấp. Hỗ trợ Apple Pencil Pro rất mượt.",
      isApproved: true,
      isPurchaseVerified: false,
      createdAt: new Date("2025-06-01"),
    },
    {
      productName: "SSD Samsung 990 PRO 2TB NVMe",
      userName: "nguyenvana",
      username: "Nguyễn Văn A",
      rating: 5,
      comment:
        "Tốc độ đọc ghi nhanh đáng kinh ngạc, giá hơi cao nhưng xứng đáng.",
      isApproved: true,
      isPurchaseVerified: true,
      createdAt: new Date("2025-05-10"),
    },
  ];

  // Lọc ra và chỉ tạo review cho sản phẩm và người dùng tồn tại
  const reviewsToCreate = reviewsData
    .filter((review) => {
      const product = productMap.get(review.productName);
      const user = userMap.get(review.userName);

      if (!product) {
        console.warn(
          `Bỏ qua review: Không tìm thấy sản phẩm "${review.productName}"`
        );
        return false;
      }

      if (!user) {
        console.warn(
          `Bỏ qua review: Không tìm thấy người dùng "${review.userName}"`
        );
        return false;
      }

      return true;
    })
    .map((review) => ({
      product: productMap.get(review.productName)._id,
      user: userMap.get(review.userName)._id,
      username: review.username,
      rating: review.rating,
      comment: review.comment,
      isApproved: review.isApproved,
      isPurchaseVerified: review.isPurchaseVerified,
      createdAt: review.createdAt,
    }));

  if (reviewsToCreate.length > 0) {
    await Review.insertMany(reviewsToCreate);
    console.log(`Đã tạo ${reviewsToCreate.length} đánh giá sản phẩm`);
  } else {
    console.log("Không có đánh giá nào được tạo");
  }
};

module.exports = seedReviews;

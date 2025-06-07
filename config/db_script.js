
use tech4u_ecommerce

// =====================================
// 1. CATEGORY MODEL
// =====================================
db.createCollection("categories", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the category"
            },
            name: {
               bsonType: "string",
               minLength: 1,
               maxLength: 100,
               description: "Category name - required, 1-100 characters"
            },
            description: {
               bsonType: "string",
               maxLength: 500,
               description: "Category description - optional, max 500 characters"
            }
         }
      }
   }
})

// Category indexes
db.categories.createIndex({ "name": 1 }, { unique: true, name: "idx_categories_name_unique" })

// =====================================
// 2. PRODUCT MODEL (with Variants Support)
// =====================================
db.createCollection("products", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "brand", "category", "basePrice", "variants"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the product"
            },
            name: {
               bsonType: "string",
               minLength: 1,
               maxLength: 200,
               description: "Product name - required, 1-200 characters"
            },
            description: {
               bsonType: "string",
               maxLength: 1000,
               description: "Product description - optional, max 1000 characters"
            },
            brand: {
               bsonType: "string",
               minLength: 1,
               maxLength: 100,
               description: "Product brand - required, 1-100 characters"
            },
            category: {
               bsonType: "objectId",
               description: "Reference to category - required"
            },
            basePrice: {
               bsonType: "number",
               minimum: 0,
               description: "Base price for this product line - required"
            },
            discountPercentage: {
                bsonType: "number",
                minimum: 0,
                maximum: 100,
                description: "Discount percentage (0-100%)"
            },
                discountPrice: {
                bsonType: "number",
                minimum: 0,
                description: "Final price after discount"
            },
                discountStartDate: {
                bsonType: "date",
                description: "Start date of the discount period"
            },
                discountEndDate: {
                bsonType: "date",
                description: "End date of the discount period"
            },
            // Common specifications across all variants (Vietnam market focused)
            commonSpecs: {
               bsonType: "object",
               properties: {
                  processor: { bsonType: "string" },
                  operatingSystem: { bsonType: "string" },
                  screenSize: { bsonType: "string" },
                  weight: { bsonType: "string" },
                  origin: {
                     bsonType: "string",
                     enum: ["Chính hãng", "Hàng xách tay", "Sản xuất tại Việt Nam", "Nhập khẩu"],
                     description: "Product origin (Xuất xứ sản phẩm)"
                  },
                  warrantyInfo: {
                     bsonType: "object",
                     properties: {
                        durationInMonths: {
                           bsonType: "int",
                           minimum: 0,
                           maximum: 120,
                           description: "Warranty duration in months"
                        },
                        type: {
                           enum: ["Bảo hành tại hãng", "Bảo hành tại cửa hàng", "Bảo hành quốc tế"],
                           description: "Type of warranty coverage"
                        },
                        coverage: {
                           bsonType: "string",
                           description: "Warranty coverage details"
                        }
                     },
                     description: "Structured warranty information (Thông tin bảo hành)"
                  }
               },
               description: "Common specifications for all variants (Thông số kỹ thuật chung)"
            },
            // Product images (common + variant-specific)
            images: {
               bsonType: "object",
               properties: {
                  main: {
                     bsonType: "array",
                     items: { bsonType: "string" },
                     description: "Main product images"
                  },
                  gallery: {
                     bsonType: "array", 
                     items: { bsonType: "string" },
                     description: "Additional product gallery images"
                  }
               },
               description: "Product image collections"
            },
            // Product variants (colors, storage, RAM, etc.)
            variants: {
               bsonType: "array",
               minItems: 1,
               items: {
                  bsonType: "object",
                  required: ["sku", "price", "stock"],
                  properties: {
                     sku: {
                        bsonType: "string",
                        minLength: 1,
                        description: "Unique SKU for this variant - required"
                     },
                     price: {
                        bsonType: "number",
                        minimum: 0,
                        description: "Price for this variant - required"
                     },
                     stock: {
                        bsonType: "int",
                        minimum: 0,
                        description: "Stock quantity for this variant - required"
                     },
                     // Variant attributes
                     attributes: {
                        bsonType: "object",
                        properties: {
                           color: { bsonType: "string" },
                           storage: { bsonType: "string" },
                           ram: { bsonType: "string" },
                           displaySize: { bsonType: "string" },
                           connectivity: { bsonType: "string" }
                        },
                        description: "Variant-specific attributes"
                     },
                     // Variant-specific images
                     images: {
                        bsonType: "array",
                        items: { bsonType: "string" },
                        description: "Images specific to this variant"
                     },
                     // Variant status
                     status: {
                        enum: ["active", "inactive", "discontinued"],
                        description: "Variant availability status"
                     },
                     isDefault: {
                        bsonType: "bool",
                        description: "Whether this is the default variant to show"
                     }
                  }
               },
               description: "Product variants - required, at least 1 variant"
            },
            // Product status and metadata
            status: {
               enum: ["active", "inactive", "discontinued"],
               description: "Overall product status"
            },
            featured: {
               bsonType: "bool",
               description: "Whether product is featured"
            },
            tags: {
               bsonType: "array",
               items: { bsonType: "string" },
               description: "Product tags for filtering/search"
            },
            createdAt: {
               bsonType: "date",
               description: "Product creation timestamp"
            },
            updatedAt: {
               bsonType: "date", 
               description: "Last update timestamp"
            }
         }
      }
   }
})

// Product indexes (updated for variants)
db.products.createIndex({ "name": "text", "description": "text", "brand": "text", "tags": "text" }, { name: "idx_products_text_search" })
db.products.createIndex({ "category": 1 }, { name: "idx_products_category" })
db.products.createIndex({ "brand": 1 }, { name: "idx_products_brand" })
db.products.createIndex({ "basePrice": 1 }, { name: "idx_products_base_price" })
db.products.createIndex({ "variants.price": 1 }, { name: "idx_products_variant_price" })
db.products.createIndex({ "variants.stock": 1 }, { name: "idx_products_variant_stock" })
db.products.createIndex({ "variants.sku": 1 }, { unique: true, sparse: true, name: "idx_products_variant_sku_unique" })
db.products.createIndex({ "variants.attributes.color": 1 }, { name: "idx_products_color" })
db.products.createIndex({ "variants.attributes.storage": 1 }, { name: "idx_products_storage" })
db.products.createIndex({ "variants.attributes.ram": 1 }, { name: "idx_products_ram" })
db.products.createIndex({ "status": 1 }, { name: "idx_products_status" })
db.products.createIndex({ "featured": 1 }, { name: "idx_products_featured" })
db.products.createIndex({ "tags": 1 }, { name: "idx_products_tags" })
db.products.createIndex({ "createdAt": -1 }, { name: "idx_products_created_desc" })

// =====================================
// 3. USER MODEL (Improved with Address Management)
// =====================================
db.createCollection("users", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["userName", "email", "password", "role", "status", "createdAt"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for each user"
            },
            userName: {
               bsonType: "string",
               minLength: 3,
               maxLength: 50,
               description: "User's display name - required, 3-50 characters"
            },
            email: {
               bsonType: "string",
               pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
               description: "User's email address - required, must be valid email format"
            },
            password: {
               bsonType: "string",
               minLength: 8,
               description: "Encrypted password - required, min 8 characters"
            },
            role: {
               enum: ["guest", "user", "admin"],
               description: "User's role in the system - required"
            },
            status: {
               enum: ["active", "blocked", "deleted"],
               description: "Current account status - required"
            },
            // User addresses for shipping (Localized for Vietnam)
            addresses: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["streetAndNumber", "ward", "district", "city"],
                  properties: {
                     _id: {
                        bsonType: "objectId",
                        description: "Unique identifier for the address"
                     },
                     name: {
                        bsonType: "string",
                        maxLength: 100,
                        description: "Address label (Nhãn địa chỉ: 'Nhà riêng', 'Văn phòng')"
                     },
                     recipientName: {
                        bsonType: "string",
                        maxLength: 100,
                        description: "Name of recipient at this address (Tên người nhận)"
                     },
                     recipientPhone: {
                        bsonType: "string",
                        pattern: "^(\\+84|0)[0-9]{9}$",
                        description: "Vietnam phone number (Số điện thoại VN: 10 chữ số)"
                     },
                     streetAndNumber: {
                        bsonType: "string",
                        minLength: 5,
                        maxLength: 200,
                        description: "House number and street name (Số nhà và Tên đường) - required"
                     },
                     ward: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 100,
                        description: "Ward (Phường/Xã) - required"
                     },
                     district: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 100,
                        description: "District (Quận/Huyện) - required"
                     },
                     city: {
                        bsonType: "string",
                        minLength: 1,
                        maxLength: 100,
                        description: "City/Province (Tỉnh/Thành phố) - required"
                     },
                     isDefault: {
                        bsonType: "bool",
                        description: "Whether this is the default shipping address"
                     },
                     createdAt: {
                        bsonType: "date",
                        description: "Address creation timestamp"
                     },
                     updatedAt: {
                        bsonType: "date",
                        description: "Address last update timestamp"
                     }
                  }
               },
               description: "User's saved shipping addresses (Địa chỉ giao hàng đã lưu)"
            },
            createdAt: {
               bsonType: "date",
               description: "Account creation timestamp - required"
            },
            lastLogin: {
               bsonType: "date",
               description: "Most recent login timestamp - optional"
            }
         }
      }
   }
})

// User indexes
db.users.createIndex({ "email": 1 }, { unique: true, name: "idx_users_email_unique" })
db.users.createIndex({ "userName": 1 }, { unique: true, name: "idx_users_username_unique" })
db.users.createIndex({ "role": 1 }, { name: "idx_users_role" })
db.users.createIndex({ "status": 1 }, { name: "idx_users_status" })
db.users.createIndex({ "createdAt": -1 }, { name: "idx_users_created_desc" })
db.users.createIndex({ "lastLogin": -1 }, { sparse: true, name: "idx_users_last_login" })
db.users.createIndex({ "addresses._id": 1 }, { sparse: true, name: "idx_users_address_id" })

// =====================================
// 4. CART MODEL
// =====================================
db.createCollection("carts", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["userId", "items", "totalAmount", "createdAt", "updatedAt"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the cart"
            },
            userId: {
               bsonType: "objectId",
               description: "Reference to user who owns this cart - required"
            },
            items: {
               bsonType: "array",
               minItems: 0,
               items: {
                  bsonType: "object",
                  required: ["productId", "quantity", "price", "name"],
                  properties: {
                     productId: {
                        bsonType: "objectId",
                        description: "Reference to the product"
                     },
                     variantId: {
                        bsonType: "string", 
                        description: "SKU of the specific variant"
                     },
                     quantity: {
                        bsonType: "int",
                        minimum: 1,
                        description: "Number of units - must be positive integer"
                     },
                     price: {
                        bsonType: "number",
                        minimum: 0,
                        description: "Unit price when added to cart"
                     },
                     name: {
                        bsonType: "string",
                        description: "Product name"
                     },
                     variantInfo: {
                        bsonType: "object",
                        properties: {
                           color: { bsonType: "string" },
                           storage: { bsonType: "string" },
                           ram: { bsonType: "string" }
                        },
                        description: "Variant attributes for display"
                     },
                     image: {
                        bsonType: "string",
                        description: "Product variant image URL"
                     }
                  }
               },
               description: "List of items in cart - required array"
            },
            totalAmount: {
               bsonType: "number",
               minimum: 0,
               description: "Total cost of all items - required"
            },
            createdAt: {
               bsonType: "date",
               description: "Cart creation timestamp - required"
            },
            updatedAt: {
               bsonType: "date",
               description: "Last modification timestamp - required"
            }
         }
      }
   }
})

// Cart indexes (updated for variants)
db.carts.createIndex({ "userId": 1 }, { unique: true, name: "idx_carts_user_unique" })
db.carts.createIndex({ "items.productId": 1 }, { name: "idx_carts_product_items" })
db.carts.createIndex({ "items.variantId": 1 }, { name: "idx_carts_variant_items" })
db.carts.createIndex({ "updatedAt": -1 }, { name: "idx_carts_updated_desc" })

// =====================================
// 5. REVIEW MODEL
// =====================================
db.createCollection("reviews", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["productId", "userId", "username", "rating", "comment", "createdAt", "updatedAt"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the review"
            },
            productId: {
               bsonType: "objectId",
               description: "Reference to reviewed product - required"
            },
            userId: {
               bsonType: "objectId",
               description: "Reference to user who wrote review - required"
            },
            username: {
               bsonType: "string",
               minLength: 1,
               maxLength: 50,
               description: "Username of reviewer - required"
            },
            rating: {
               bsonType: "int",
               minimum: 1,
               maximum: 5,
               description: "Star rating 1-5 - required"
            },
            comment: {
               bsonType: "string",
               minLength: 1,
               maxLength: 1000,
               description: "Review text content - required, max 1000 characters"
            },
            isApproved: {
               bsonType: "bool",
               description: "Approval status - default false"
            },
            isPurchaseVerified: {
               bsonType: "bool",
               description: "Whether this review is from a verified purchase (Xác nhận đã mua hàng)"
            },
            createdAt: {
               bsonType: "date",
               description: "Review submission timestamp - required"
            },
            updatedAt: {
               bsonType: "date",
               description: "Last modification timestamp - required"
            }
         }
      }
   }
})

// Review indexes
db.reviews.createIndex({ "productId": 1 }, { name: "idx_reviews_product" })
db.reviews.createIndex({ "userId": 1 }, { name: "idx_reviews_user" })
db.reviews.createIndex({ "rating": 1 }, { name: "idx_reviews_rating" })
db.reviews.createIndex({ "isApproved": 1 }, { name: "idx_reviews_approved" })
db.reviews.createIndex({ "isPurchaseVerified": 1 }, { name: "idx_reviews_purchase_verified" })
db.reviews.createIndex({ "createdAt": -1 }, { name: "idx_reviews_created_desc" })
db.reviews.createIndex({ "userId": 1, "productId": 1 }, { unique: true, name: "idx_reviews_user_product_unique" })

// =====================================
// 6. ORDER MODEL (Improved with Structured Address)
// =====================================
db.createCollection("orders", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["userId", "itemsAmount", "totalAmount", "shippingAddress", "paymentMethod", "status", "paymentStatus", "createdAt", "updatedAt"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the order"
            },
            userId: {
               bsonType: "objectId",
               description: "Reference to user who placed order - required"
            },
            items: {
               bsonType: "array",
               minItems: 1,
               items: {
                  bsonType: "object",
                  required: ["productId", "variantId", "quantity", "price", "name"],
                  properties: {
                     productId: {
                        bsonType: "objectId",
                        description: "Reference to ordered product"
                     },
                     variantId: {
                        bsonType: "string",
                        description: "SKU of the ordered variant"
                     },
                     quantity: {
                        bsonType: "int",
                        minimum: 1,
                        description: "Quantity ordered"
                     },
                     price: {
                        bsonType: "number",
                        minimum: 0,
                        description: "Unit price at time of order"
                     },
                     name: {
                        bsonType: "string",
                        description: "Product name"
                     },
                     variantInfo: {
                        bsonType: "object",
                        properties: {
                           color: { bsonType: "string" },
                           storage: { bsonType: "string" },
                           ram: { bsonType: "string" }
                        },
                        description: "Variant details at time of order"
                     }
                  }
               },
               description: "List of ordered items"
            },
            // Structured shipping address (snapshot from user addresses)
            shippingAddress: {
               bsonType: "object",
               required: ["recipientName", "recipientPhone", "streetAndNumber", "ward", "district", "city"],
               properties: {
                  recipientName: {
                     bsonType: "string",
                     minLength: 1,
                     maxLength: 100,
                     description: "Name of recipient (Tên người nhận) - required"
                  },
                  recipientPhone: {
                     bsonType: "string",
                     pattern: "^(\\+84|0)[0-9]{9}$",
                     description: "Vietnam phone number (Số điện thoại VN) - required"
                  },
                  streetAndNumber: {
                     bsonType: "string",
                     minLength: 5,
                     maxLength: 200,
                     description: "House number and street name (Số nhà và Tên đường) - required"
                  },
                  ward: {
                     bsonType: "string",
                     minLength: 1,
                     maxLength: 100,
                     description: "Ward (Phường/Xã) - required"
                  },
                  district: {
                     bsonType: "string",
                     minLength: 1,
                     maxLength: 100,
                     description: "District (Quận/Huyện) - required"
                  },
                  city: {
                     bsonType: "string",
                     minLength: 1,
                     maxLength: 100,
                     description: "City/Province (Tỉnh/Thành phố) - required"
                  },
                  fullAddress: {
                     bsonType: "string",
                     description: "Complete formatted address string for display"
                  }
               },
               description: "Structured delivery address (Địa chỉ giao hàng có cấu trúc) - required"
            },
            // Payment method (Vietnam market)
            paymentMethod: {
               enum: ["cod", "bank_transfer", "vnpay_qr", "momo", "zalo_pay", "shopee_pay", "credit_card"],
               description: "Payment method (Phương thức thanh toán) - required"
            },
            // Shipping information for tracking
            shippingInfo: {
               bsonType: "object",
               properties: {
                  provider: {
                     enum: ["GHTK", "GHN", "ViettelPost", "GrabExpress", "J&T", "Best Express"],
                     description: "Shipping provider (Đơn vị vận chuyển)"
                  },
                  trackingCode: {
                     bsonType: "string",
                     maxLength: 50,
                     description: "Tracking code (Mã vận đơn)"
                  },
                  shippingFee: {
                     bsonType: "number",
                     minimum: 0,
                     description: "Shipping fee (Phí vận chuyển)"
                  },
                  estimatedDeliveryDate: {
                     bsonType: "date",
                     description: "Estimated delivery date (Ngày giao hàng dự kiến)"
                  },
                  actualDeliveryDate: {
                     bsonType: "date",
                     description: "Actual delivery date (Ngày giao hàng thực tế)"
                  }
               },
               description: "Shipping tracking information (Thông tin vận chuyển)"
            },
            // Detailed amount breakdown
            itemsAmount: {
               bsonType: "number",
               minimum: 0,
               description: "Total items cost (Tổng tiền hàng)"
            },
            totalAmount: {
               bsonType: "number",
               minimum: 0,
               description: "Final total amount including shipping (Tổng tiền thanh toán cuối cùng) - required"
            },
            status: {
               enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
               description: "Order status - required"
            },
            paymentStatus: {
               enum: ["pending", "completed", "failed"],
               description: "Payment status - required"
            },
            createdAt: {
               bsonType: "date",
               description: "Order creation timestamp - required"
            },
            updatedAt: {
               bsonType: "date",
               description: "Last update timestamp - required"
            }
         }
      }
   }
})

// Order indexes (updated for variants, structured address, and Vietnam market)
db.orders.createIndex({ "userId": 1 }, { name: "idx_orders_user" })
db.orders.createIndex({ "status": 1 }, { name: "idx_orders_status" })
db.orders.createIndex({ "paymentStatus": 1 }, { name: "idx_orders_payment_status" })
db.orders.createIndex({ "paymentMethod": 1 }, { name: "idx_orders_payment_method" })
db.orders.createIndex({ "createdAt": -1 }, { name: "idx_orders_created_desc" })
db.orders.createIndex({ "userId": 1, "createdAt": -1 }, { name: "idx_orders_user_created" })
db.orders.createIndex({ "items.productId": 1 }, { name: "idx_orders_product_items" })
db.orders.createIndex({ "items.variantId": 1 }, { name: "idx_orders_variant_items" })
db.orders.createIndex({ "shippingAddress.city": 1 }, { name: "idx_orders_shipping_city" })
db.orders.createIndex({ "shippingAddress.district": 1 }, { name: "idx_orders_shipping_district" })
db.orders.createIndex({ "shippingInfo.provider": 1 }, { name: "idx_orders_shipping_provider" })
db.orders.createIndex({ "shippingInfo.trackingCode": 1 }, { sparse: true, name: "idx_orders_tracking_code" })

// =====================================
// 7. STATISTICS COLLECTION (for StatisticModel)
// =====================================
db.createCollection("statistics", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["type", "data", "createdAt"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the statistic record"
            },
            type: {
               enum: ["daily_sales", "monthly_revenue", "product_performance", "user_activity", "category_stats"],
               description: "Type of statistic - required"
            },
            data: {
               bsonType: "object",
               description: "Statistical data object - required"
            },
            period: {
               bsonType: "string",
               description: "Time period (e.g., '2024-01', '2024-01-15')"
            },
            createdAt: {
               bsonType: "date",
               description: "Statistic creation timestamp - required"
            }
         }
      }
   }
})

// Statistics indexes
db.statistics.createIndex({ "type": 1 }, { name: "idx_statistics_type" })
db.statistics.createIndex({ "period": 1 }, { name: "idx_statistics_period" })
db.statistics.createIndex({ "type": 1, "period": 1 }, { name: "idx_statistics_type_period" })
db.statistics.createIndex({ "createdAt": -1 }, { name: "idx_statistics_created_desc" })


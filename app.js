const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { isLoggedIn } = require("./middlewares/auth");
const expressLayouts = require("express-ejs-layouts");

// Load config
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// EJS helpers
app.use(function (req, res, next) {
  res.locals.formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  res.locals.truncateText = (text, length) => {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  next();
});

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Flash messages
app.use(flash());

// Set up auth middleware
app.use(isLoggedIn);

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(expressLayouts);
app.set("layout", "layouts/main");

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/products", require("./routes/products"));
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/reviews", require("./routes/reviews"));
app.use("/cart", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));

// 404 handler
app.use((req, res) => {
  res.status(404).render("pages/404", {
    title: "Không tìm thấy trang",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("pages/error", {
    title: "Lỗi máy chủ",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

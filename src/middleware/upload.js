const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Đường dẫn đến thư mục lưu trữ tạm thời
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên tệp với dấu thời gian để tránh trùng lặp
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

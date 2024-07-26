const corsOptions = {
  origin: ["https://supermarket-5bkc.onrender.com", "http://localhost:4000"], // Thay đổi thành các nguồn gốc cụ thể nếu cần
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

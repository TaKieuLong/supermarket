const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Product = require('../src/models/Product.model.js'); // Đảm bảo đúng đường dẫn tới file model
require('dotenv').config(); 
// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connection successful")});

// Danh sách sản phẩm
const products =[
    {
      "name": "Ghế sofa da cao cấp",
      "description": "Ghế sofa da cao cấp với thiết kế hiện đại và sự thoải mái tối ưu.",
      "price": 8000000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["sofa1.jpg", "sofa2.jpg"],
      "sizes": ["3 người", "4 người"],
      "colors": ["Đen", "Nâu"]
    },
    {
      "name": "Bàn ăn gỗ tự nhiên",
      "description": "Bàn ăn gỗ tự nhiên với thiết kế sang trọng và độ bền cao.",
      "price": 5000000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["dining-table1.jpg", "dining-table2.jpg"],
      "sizes": ["4 người", "6 người"],
      "colors": ["Gỗ tự nhiên"]
    },
    {
      "name": "Giường ngủ gỗ công nghiệp",
      "description": "Giường ngủ gỗ công nghiệp với thiết kế tiện dụng và tiết kiệm không gian.",
      "price": 3500000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["bed1.jpg", "bed2.jpg"],
      "sizes": ["Queen", "King"],
      "colors": ["Trắng", "Nâu"]
    },
    {
      "name": "Tủ quần áo 3 cánh",
      "description": "Tủ quần áo 3 cánh với không gian lưu trữ rộng rãi và thiết kế hiện đại.",
      "price": 4200000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["wardrobe1.jpg", "wardrobe2.jpg"],
      "sizes": ["3 cánh"],
      "colors": ["Gỗ sáng", "Trắng"]
    },
    {
      "name": "Bàn làm việc đa năng",
      "description": "Bàn làm việc đa năng với nhiều ngăn kéo và không gian làm việc rộng rãi.",
      "price": 3000000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["office-desk1.jpg", "office-desk2.jpg"],
      "sizes": ["Lớn", "Nhỏ"],
      "colors": ["Gỗ sáng", "Đen"]
    },
    {
      "name": "Kệ sách treo tường",
      "description": "Kệ sách treo tường giúp tiết kiệm không gian và giữ sách gọn gàng.",
      "price": 1500000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["wall-shelf1.jpg", "wall-shelf2.jpg"],
      "sizes": ["Nhỏ", "Lớn"],
      "colors": ["Trắng", "Gỗ"]
    },
    {
      "name": "Ghế ăn gỗ tự nhiên",
      "description": "Ghế ăn gỗ tự nhiên với thiết kế đơn giản và thoải mái.",
      "price": 1200000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["dining-chair1.jpg", "dining-chair2.jpg"],
      "sizes": ["Một kích cỡ"],
      "colors": ["Gỗ tự nhiên"]
    },
    {
      "name": "Tủ TV gỗ công nghiệp",
      "description": "Tủ TV gỗ công nghiệp với thiết kế tinh tế và nhiều ngăn lưu trữ.",
      "price": 2200000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["tv-stand1.jpg", "tv-stand2.jpg"],
      "sizes": ["Một kích cỡ"],
      "colors": ["Trắng", "Gỗ"]
    },
    {
      "name": "Bàn trà mặt đá",
      "description": "Bàn trà mặt đá với thiết kế sang trọng và dễ dàng lau chùi.",
      "price": 4000000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["coffee-table1.jpg", "coffee-table2.jpg"],
      "sizes": ["Nhỏ", "Lớn"],
      "colors": ["Đen", "Xám"]
    },
    {
      "name": "Gương trang trí phòng ngủ",
      "description": "Gương trang trí phòng ngủ với khung gỗ và thiết kế hiện đại.",
      "price": 1800000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["decorative-mirror1.jpg", "decorative-mirror2.jpg"],
      "sizes": ["Trung bình"],
      "colors": ["Gỗ tự nhiên", "Trắng"]
    },
    {
      "name": "Bàn ăn gỗ xoan đào",
      "description": "Bàn ăn gỗ xoan đào với chất liệu gỗ tự nhiên và thiết kế chắc chắn.",
      "price": 4500000,
      "category": "66a3286e57845d3d0bd4c5dc",
      "images": ["dining-table-wood1.jpg", "dining-table-wood2.jpg"],
      "sizes": ["6 người"],
      "colors": ["Gỗ xoan đào"]
    }
  ]
  
// Chuyển đổi category từ chuỗi thành ObjectId
products.forEach(product => {
  product.category = new ObjectId(product.category);
});

// Thêm nhiều sản phẩm vào database
Product.insertMany(products)
  .then(() => {
    console.log('Products added successfully');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  });

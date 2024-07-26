const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: { type: String, required: true },
  order_date: { type: Date, default: Date.now },
  delivery_date: { type: Date },
});

module.exports = mongoose.model("Order", orderSchema);



// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
//   products: [
//     {
//       product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   total_price: { type: Number, required: true },
//   status: { type: String, required: true },
//   order_date: { type: Date, default: Date.now },
//   delivery_date: { type: Date }
// });

// module.exports = mongoose.model('Order', OrderSchema);

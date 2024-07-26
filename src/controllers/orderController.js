// const Order = require('../models/Order.model.js');
// const Product = require('../models/Product.model.js');

// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('customer').populate('products.product_id');
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('customer').populate('products.product_id');
//     if (!order) {
//       return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
//     }
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, products, total_price, status, delivery_date } = req.body;

//     // Kiểm tra số lượng sản phẩm
//     for (const item of products) {
//       const product = await Product.findById(item.product_id);
//       if (!product) {
//         return res.status(400).json({ message: `Sản phẩm với ID ${item.product_id} không tồn tại` });
//       }
//     }

//     const newOrder = new Order({
//       customer,
//       products,
//       total_price,
//       status,
//       order_date: new Date(),
//       delivery_date
//     });

//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateOrder = async (req, res) => {
//   try {
//     const { customer, products, total_price, status, delivery_date } = req.body;
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
//     }

//     order.customer = customer || order.customer;
//     order.products = products || order.products;
//     order.total_price = total_price || order.total_price;
//     order.status = status || order.status;
//     order.delivery_date = delivery_date || order.delivery_date;

//     await order.save();
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
//     }

//     await order.remove();
//     res.status(200).json({ message: 'Xóa đơn hàng thành công' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Order = require("../models/Order.model.js");
const Product = require("../models/Product.model.js");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customer, items, status, delivery_date } = req.body;

    let totalAmount = 0;
    // Kiểm tra và tính toán tổng giá trị đơn hàng
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Sản phẩm với ID ${item.product} không tồn tại` });
      }
      totalAmount += item.quantity * item.price;
    }

    const newOrder = new Order({
      customer,
      items,
      totalAmount,
      status,
      delivery_date,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { customer, items, status, delivery_date } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    order.customer = customer || order.customer;
    order.items = items || order.items;
    order.status = status || order.status;
    order.delivery_date = delivery_date || order.delivery_date;

    // Cập nhật lại tổng giá trị đơn hàng
    let totalAmount = 0;
    for (const item of order.items) {
      totalAmount += item.quantity * item.price;
    }
    order.totalAmount = totalAmount;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

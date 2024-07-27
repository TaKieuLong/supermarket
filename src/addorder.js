const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Order = require("../src/models/Order.model.js");
require("dotenv").config();
// JSON cung cấp
const jsonCustomers = [
  { _id: { $oid: "66a32afc57845d3d0bd7b1c5" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1c6" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1c7" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1c8" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1c9" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ca" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1cb" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1cc" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1cd" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ce" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1cf" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d0" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d1" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d2" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d3" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d4" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d5" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d6" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d7" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d8" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1d9" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1da" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1db" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1dc" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1dd" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1de" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1df" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e0" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e1" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e2" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e3" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e4" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e5" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e6" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e7" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e8" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1e9" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ea" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1eb" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ec" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ed" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ee" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1ef" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f0" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f1" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f2" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f3" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f4" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f5" } },
  { _id: { $oid: "66a32afc57845d3d0bd7b1f6" } },
  { _id: { $oid: "66a368a92318cc2616c6c0f6" } },
  { _id: { $oid: "66a3af973790d3a96e6472fb" } },
];
const jsonProducts = [
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4db",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4dc",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4dd",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4de",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4df",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4e0",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4e1",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4e2",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4e3",
    },
  },
  {
    _id: {
      $oid: "66a3dc007a84765b209bb4e4",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd134",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd135",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd136",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd137",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd138",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd139",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd13a",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd13b",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd13c",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd13d",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd13e",
    },
  },
  {
    _id: {
      $oid: "66a3ddd7e36331274cdcd13f",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6826",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6827",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6828",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6829",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f682a",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f682b",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f682c",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f682d",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f682e",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f682f",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6830",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6831",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6832",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6833",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6834",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6835",
    },
  },
  {
    _id: {
      $oid: "66a3dee06b831945136f6836",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81938",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81939",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a8193a",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a8193b",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a8193c",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a8193d",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a8193e",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a8193f",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81940",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81941",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81942",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81943",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81944",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81945",
    },
  },
  {
    _id: {
      $oid: "66a3df6ae7d4c62205a81946",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b1",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b2",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b3",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b4",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b5",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b6",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b7",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b8",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052b9",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052ba",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052bb",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052bc",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052bd",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052be",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052bf",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c0",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c1",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c2",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c3",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c4",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c5",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c6",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c7",
    },
  },
  {
    _id: {
      $oid: "66a3e0316981455802a052c8",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04e9",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04ea",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04eb",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04ec",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04ed",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04ee",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04ef",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f0",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f1",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f2",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f3",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f4",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f5",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f6",
    },
  },
  {
    _id: {
      $oid: "66a3e078901bf738891e04f7",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e2",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e3",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e4",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e5",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e6",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e7",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e8",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535e9",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535ea",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535eb",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535ec",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535ed",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535ee",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535ef",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f0",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f1",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f2",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f3",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f4",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f5",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f6",
    },
  },
  {
    _id: {
      $oid: "66a3e0e41ee2726beb1535f7",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3eea",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3eeb",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3eec",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3eed",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3eee",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3eef",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3ef0",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3ef1",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3ef2",
    },
  },
  {
    _id: {
      $oid: "66a3e35ae309534fcd3a3ef3",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcc5",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcc6",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcc7",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcc8",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcc9",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcca",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dccb",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dccc",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dccd",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcce",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dccf",
    },
  },
  {
    _id: {
      $oid: "66a3e395ac43db5b3ba9dcd0",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac0",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac1",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac2",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac3",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac4",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac5",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac6",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac7",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac8",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ac9",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097aca",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097acb",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097acc",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097acd",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097ace",
    },
  },
  {
    _id: {
      $oid: "66a3e3cdd7f62f3835097acf",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a70",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a71",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a72",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a73",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a74",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a75",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a76",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a77",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a78",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a79",
    },
  },
  {
    _id: {
      $oid: "66a3e439382106fc27fe3a7a",
    },
  },
];
// Chuyển đổi JSON thành mảng ObjectId
const customers = jsonCustomers.map((customer) => new ObjectId(customer._id.$oid));
const products = jsonProducts.map((product) => new ObjectId(product._id.$oid));

// Tạo đơn hàng
const createOrders = async () => {
  const statuses = ["processing", "delivering", "delivered", "failed"]; // Các trạng thái đơn hàng

  for (let customerId of customers) {
    const items = products.map((product) => ({
      product,
      quantity: Math.floor(Math.random() * 10) + 1, // số lượng ngẫu nhiên từ 1 đến 10
      price: Math.floor(Math.random() * 1000) + 1, // giá ngẫu nhiên từ 1 đến 1000
    }));

    const totalAmount = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // Chọn trạng thái ngẫu nhiên từ mảng statuses
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const order = new Order({
      customer: customerId,
      orderDate: new Date(),
      status,
      items,
      totalAmount,
      delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ngày giao hàng sau 7 ngày từ bây giờ
    });

    await order.save();
  }
};

// Kết nối đến MongoDB và thực hiện tạo đơn hàng
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return createOrders();
  })
  .then(() => {
    console.log("Orders created successfully");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error creating orders:", err);
    mongoose.disconnect();
  });

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer.model.js");
const { jwtSecret } = require("../config.js");
require("dotenv").config();
exports.register = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    await newCustomer.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "365d",
    });
    res.status(200).json({ token, customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

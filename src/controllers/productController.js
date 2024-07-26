const Product = require("../models/Product.model.js");
const mongoose = require("mongoose");
const Category = require("../models/Category.model.js");
const findCategoryIdByName = async (name) => {
  const category = await Category.findOne({ name });
  return category ? category._id : null;
};

function toObjectId(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }
  return null;
}
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      name,
      category,
      minPrice,
      maxPrice,
      sortByDate,
    } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = toObjectId(category);
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    const sort = sortByDate ? { createdAt: -1 } : {};
    console.log(query)
    const products = await Product.find(query)
      .populate("category")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, sizes, colors } =
      req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      sizes,
      colors,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Thêm sản phẩm mới thành công", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, sizes, colors } =
      req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.images = images || product.images;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;

    await product.save();
    res.status(200).json({
      message: "Cập nhật thông tin sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkProductExists = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ message: "sản phẩm có sẵn trong kho!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

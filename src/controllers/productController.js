const Product = require("../models/Product.model.js");
const mongoose = require("mongoose");
const Category = require("../models/Category.model.js");
const cloudinary = require("../utils/cloudinary.config.js");
// const cloudinary = require("cloudinary").v2;
const upload = require("../middleware/upload.js");
const fs = require("fs");
const path = require("path");
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
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.category = new mongoose.Types.ObjectId(category);
      } else {
        return res.status(400).send({
          code: 1,
          mess: "ID danh mục không hợp lệ",
        });
      }
    }
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    const sort = sortByDate ? { createdAt: -1 } : {};
    console.log(query);
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
    const { name, description, price, category, sizes, colors } = req.body;

    // Xử lý các tệp hình ảnh
    const imageUploadPromises = req.files.map((file) => {
      return cloudinary.uploader
        .upload(file.path, { folder: "products" })
        .then((result) => {
          // Xóa tệp hình ảnh sau khi upload thành công
          fs.unlinkSync(file.path);
          return result.secure_url;
        })
        .catch((err) => {
          console.error("Cloudinary upload error:", err);
          throw err;
        });
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images: imageUrls,
      sizes,
      colors,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Thêm sản phẩm mới thành công", data: newProduct });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, colors } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Xử lý các tệp hình ảnh nếu có
    let imageUrls = product.images;
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const imageUploadPromises = req.files.map((file) =>
        cloudinary.uploader
          .upload(file.path, { folder: "products" })
          .then((result) => {
            // Xóa tệp hình ảnh sau khi upload thành công
            fs.unlinkSync(file.path);
            return result.secure_url;
          })
          .catch((err) => {
            console.error("Cloudinary upload error:", err);
            throw err;
          })
      );

      const uploadedImageUrls = await Promise.all(imageUploadPromises);
      imageUrls = uploadedImageUrls; // Thay thế các URL hình ảnh cũ bằng các URL mới
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.images = imageUrls;

    await product.save();
    res.status(200).json({
      message: "Cập nhật thông tin sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    console.error("Server error:", error);
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

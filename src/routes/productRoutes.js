const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductExists,
} = require("../controllers/productController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../middleware/upload.js");
const router = express.Router();
require("dotenv").config();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the product
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category of the product
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: The minimum price of the product
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: The maximum price of the product
 *       - in: query
 *         name: sortByDate
 *         schema:
 *           type: boolean
 *         description: Sort by date
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên sản phẩm
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *               price:
 *                 type: number
 *                 description: Giá sản phẩm
 *               category:
 *                 type: string
 *                 description: Danh mục sản phẩm
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Các kích thước của sản phẩm
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Các màu sắc của sản phẩm
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Các tệp hình ảnh của sản phẩm
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, upload.array("images"), createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên sản phẩm
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *               price:
 *                 type: number
 *                 description: Giá sản phẩm
 *               category:
 *                 type: string
 *                 description: Danh mục sản phẩm
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Các kích thước của sản phẩm
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Các màu sắc của sản phẩm
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Các tệp hình ảnh của sản phẩm
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, upload.array("images"), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, deleteProduct);

/**
 * @swagger
 * /api/products/exists/{id}:
 *   get:
 *     summary: Check if a product exists by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product exists
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/exists/:id", authMiddleware, checkProductExists);

module.exports = router;

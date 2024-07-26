const express = require("express");
const { register, login } = require("../controllers/authController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Long quá sức đẹp trai"
 *               email:
 *                 type: string
 *                 example: "binhthuongthoi@gmail.com"
 *               password:
 *                 type: string
 *                 example: "mothai345sau"
 *               address:
 *                 type: string
 *                 example: "123 Con gà ta phường 9 quận Cam Thành phố Lột Ăn dơ lét"
 *               phone:
 *                 type: string
 *                 example: "080855608"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng ký thành công"
 *       400:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email đã tồn tại"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error message"
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "binhthuongthoi@gmail.com"
 *               password:
 *                 type: string
 *                 example: "mothai345sau"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d...123"
 *                     name:
 *                       type: string
 *                       example: "Long quá đẹp trai"
 *                     email:
 *                       type: string
 *                       example: "binhthuongthoi.com"
 *                     address:
 *                       type: string
 *                       example: "123 Pham The Hien phường 7 quận 8"
 *                     phone:
 *                       type: string
 *                       example: "0869268629"
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     emailNotFound:
 *                       value: "Email không tồn tại"
 *                     incorrectPassword:
 *                       value: "Mật khẩu không đúng"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error message"
 */
router.post("/login", login);

module.exports = router;

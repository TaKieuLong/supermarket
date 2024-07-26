// src/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: " SuperMarket Project APIs",
    version: "1.0.0",
    description: "Includes CURD authAPI, productAPI, OrderAPI",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Product: {
        type: "object",
        required: ["name", "price", "category"],
        properties: {
          name: {
            type: "string",
            example: "Iphone 17",
          },
          description: {
            type: "string",
            example: "Have a new technology",
          },
          price: {
            type: "number",
            example: 18000,
          },
          category: {
            type: "string",
            example: "60d...123",
          },
          images: {
            type: "array",
            items: {
              type: "string",
              example: "image_url.jpg",
            },
          },
          sizes: {
            type: "array",
            items: {
              type: "string",
              example: "M",
            },
          },
          colors: {
            type: "array",
            items: {
              type: "string",
              example: "red",
            },
          },
        },
      },
      Customer: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60d...123",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "john.doe@example.com",
          },
          address: {
            type: "string",
            example: "123 Main St",
          },
          phone: {
            type: "string",
            example: "123-456-7890",
          },
        },
      },
      Order: {
        type: 'object',
        required: ['customer', 'items', 'totalAmount', 'status'],
        properties: {
          id: {
            type: 'string',
            description: 'ID của đơn hàng',
          },
          customer: {
            type: 'string',
            description: 'ID của khách hàng',
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'string',
                  description: 'ID của sản phẩm',
                },
                quantity: {
                  type: 'integer',
                  description: 'Số lượng sản phẩm',
                },
                price: {
                  type: 'number',
                  description: 'Giá của sản phẩm',
                },
              },
            },
          },
          totalAmount: {
            type: 'number',
            description: 'Tổng giá trị đơn hàng',
          },
          status: {
            type: 'string',
            description: 'Trạng thái đơn hàng',
          },
          orderDate: {
            type: 'string',
            format: 'date-time',
            description: 'Ngày đặt hàng',
          },
          deliveryDate: {
            type: 'string',
            format: 'date-time',
            description: 'Ngày giao hàng',
          },
        },
      },
      OrderInput: {
        type: 'object',
        required: ['customer', 'items', 'status'],
        properties: {
          customer: {
            type: 'string',
            description: 'ID của khách hàng',
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'string',
                  description: 'ID của sản phẩm',
                },
                quantity: {
                  type: 'integer',
                  description: 'Số lượng sản phẩm',
                },
                price: {
                  type: 'number',
                  description: 'Giá của sản phẩm',
                },
              },
            },
          },
          totalAmount: {
            type: 'number',
            description: 'Tổng giá trị đơn hàng',
          },
          status: {
            type: 'string',
            description: 'Trạng thái đơn hàng',
          },
          deliveryDate: {
            type: 'string',
            format: 'date-time',
            description: 'Ngày giao hàng',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,

  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

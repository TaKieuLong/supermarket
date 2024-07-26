const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");
const restRouter = require("./routes/index.js");
const corsMiddleware = require("../src/middleware/corsMiddleware.js");

const app = express();

// Sử dụng middleware CORS
app.use(corsMiddleware);

// Sử dụng các middleware khác
app.use(express.json());
app.use(bodyParser.json());

// Kết nối MongoDB
require("./mongodb.js");

// Định nghĩa route cho REST API
app.use("/api", restRouter);

// Khởi động Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Server is running on port 4000");
  });
};

startServer();

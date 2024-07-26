const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");
const restRouter = require("./routes/index.js");
const corsMiddleware = require("../src/middleware/corsMiddleware.js");
const app = express();
app.use(corsMiddleware);
app.use(express.json());

require("./mongodb.js");
app.use(bodyParser.json());
app.use("/api", restRouter);

const server = new ApolloServer({ typeDefs, resolvers });
await server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Server is running on port 4000");
  });
});

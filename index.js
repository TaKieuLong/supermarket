const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const typeDefs = require("./src/schema.js");
const resolvers = require("./src/resolvers.js");
const app = express();
const jwt = require("jsonwebtoken");
const swagger = require("./src/swagger.js");
const restRouter = require("./src/routes/index.js");

app.use(express.json());
//cors
app.use(
  cors((req, callback) => {
    callback(null, { origin: true });
  })
);

require("./src/mongodb.js");

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, "your_jwt_secret");
    }
    return null;
  } catch (err) {
    return null;
  }
};
app.use(bodyParser.json());
app.use("/api", restRouter);
swagger(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token);
    return { user };
  },
  formatError: (err) => {
    if (err.originalError && err.originalError.code) {
      return {
        message: err.message,
        code: err.originalError.code,
        locations: err.locations,
        path: err.path,
      };
    }
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  },
});
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Server is running on port 4000");
  });
});

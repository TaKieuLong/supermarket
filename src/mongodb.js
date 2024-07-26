const mongoose = require("mongoose");
require('dotenv').config(); // Load môi trường từ file .env

class MongoDB {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error:", err);
      });
  }
}

module.exports = new MongoDB();

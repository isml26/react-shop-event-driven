const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/shop_users";

// write all async await function inside of a function

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
};

export { connectDB };

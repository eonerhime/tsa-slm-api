const dotenv = require("dotenv");

// Load correct env file
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.local",
});

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI_ATLAS
        : process.env.MONGODB_URI_LOCAL;

    await mongoose.connect(mongoURI);

    console.log(`Connected to MongoDB at ${mongoURI}`);
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_LOCAL_URI);
    console.log("Connected to MongoDB");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;

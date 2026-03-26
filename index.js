require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3100;
const connectDB = require("./config/database");

// Import routes
const bookRoutes = require("./routes/book.route");
const authorRoutes = require("./routes/author.route");
const studentRoutes = require("./routes/student.route");
const libraryAttendantRoutes = require("./routes/library-attendant.route");

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/api/book", bookRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/library-attendant", libraryAttendantRoutes);

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

// Basic route to test API
app.get("/", (req, res) => {
  res.send("API is running");
});

/**
 const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
 */

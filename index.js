require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3100;
const connectDB = require("./config/database");

// Import routes
const bookRoutes = require("./routes/books.route");
const authorRoutes = require("./routes/authors.route");
const studentRoutes = require("./routes/student.route");
const libraryAttendantRoutes = require("./routes/attendant.route");

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendants", libraryAttendantRoutes);

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Swagger docs available at: http://localhost:${PORT}/api-docs`);
  });
});

// Basic route to test API
app.get("/", (req, res) => {
  res.send("API is running");
});

const express = require("express");
const router = express.Router();

const {
  createBook,
  borrowBook,
  returnBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");

// Create a new book
router.post("/new", createBook);

// Borrow a book
router.post("/:id/borrow", borrowBook);

// Return a book
router.post("/:id/return", returnBook);

// Get all books
router.get("/", getAllBooks);

// Get a book by ID
router.get("/:id", getBookById);

// Update a book by ID
router.put("/:id", updateBookById);

// Delete a book by ID
router.delete("/:id", deleteBookById);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
} = require("../controllers/authors.controller");

// Create a new author
router.post("/new", createAuthor);

// Get all authors
router.get("/", getAllAuthors);

// Get a author by ID
router.get("/:id", getAuthorById);

// Update a author by ID
router.put("/:id", updateAuthorById);

// Delete a author by ID
router.delete("/:id", deleteAuthorById);

module.exports = router;

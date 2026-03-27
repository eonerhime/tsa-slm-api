const Author = require("../models/authors.model");

/*
Sample data for creating an author:
{
    "name": "Michael Thomas Bottle",
    "bio": "Author of over 20 award winning educational materials"
}
  _id: 69c64397cb3b66b97a4d4bb9
*/

// Create a new author
const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;

    if (!name || !bio) {
      return res.status(400).json({ message: "Name and bio are required" });
    }

    const author = await Author.create({ name, bio });
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single author by ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an author by ID
const updateAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;

    if (!name && !bio) {
      return res.status(400).json({ message: "Name or bio is required" });
    }

    const author = await Author.findByIdAndUpdate(
      id,
      { name, bio },
      { new: true, runValidators: true },
    );

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an author by ID
const deleteAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};

const Book = require("../models/books.model");
const Author = require("../models/authors.model");

/*
Sample data for creating a book:
{
  "title": "Things Coming Together",
  "isbn": "9780435905255",
  "author": ["69c56e688ca4260ef6077457"]
}
  book_id:69c643da1096e2002095b091
*/
// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, isbn, author } = req.body;

    if (!title || !isbn || !Array.isArray(author) || author.length === 0) {
      return res
        .status(400)
        .json({ message: "Title, ISBN, and author are required" });
    }

    // Check that the provided author ID exists
    const existingAuthor = await Author.findById(author[0]);

    if (!existingAuthor) {
      return res.status(400).json({
        message: "Provided author ID is invalid or does not exist",
      });
    }

    const book = await Book.create({
      title,
      isbn,
      author,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*
Sample data for borrowing a book:
POST /api/books/69c58221b08141f31380689f/borrow
{
  "studentId": "69c553994f666544157194b9",
  "attendantId": "69ce1e444272e002d4d8441e",
  "dueDate": "2026-04-05T00:00:00.000Z"
}
*/

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, dueDate } = req.body;
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book is already borrowed" });
    }
    if (!studentId || !attendantId || !dueDate) {
      return res.status(400).json({
        message: "Student ID, Attendant ID, and Due Date are required",
      });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnedAt = null;
    book.receivedBy = null;
    book.dueDate = dueDate;

    await book.save();
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*
Sample data for returning a book:
POST /api/books/69c58221b08141f31380689f/return
{
  "studentId": "69c553994f666544157194b9",
  "attendantId": "69ce225aaffec2f75436bee1",
  "returnedAt": "2026-04-04T10:30:00.000Z"
}
*/

// Return a book
const returnBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnedAt } = req.body;
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status === "IN") {
      return res.status(400).json({ message: "Book is not borrowed" });
    }

    book.status = "IN";
    book.borrowedBy = studentId;
    book.receivedBy = attendantId;
    book.returnedAt = returnedAt;

    await book.save();
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id)
      .populate("author")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
Sample data for updating a book:
{
  "title": "Things Come Together - Updated"
}
*/

// Update a book by ID
const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true },
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book by ID
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  borrowBook,
  returnBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};

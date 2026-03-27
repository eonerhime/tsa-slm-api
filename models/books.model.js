const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    isbn: {
      type: String,
      unique: [true, "ISBN must be unique"],
      required: [true, "ISBN is required"],
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendant",
      default: null,
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendant",
      default: null,
    },
    returnedAt: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;

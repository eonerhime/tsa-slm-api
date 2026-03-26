const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;

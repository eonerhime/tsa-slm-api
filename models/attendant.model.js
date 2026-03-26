const mongoose = require("mongoose");

const LibraryAttendantsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    staffId: {
      type: String,
      required: [true, "Staff ID is required"],
      unique: [true, "Staff ID must be unique"],
    },
  },
  {
    timestamps: true,
  },
);

const LibraryAttendants = mongoose.model(
  "LibraryAttendant",
  LibraryAttendantsSchema,
);

module.exports = LibraryAttendants;

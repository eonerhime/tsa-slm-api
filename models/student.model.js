const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: [true, "Student ID must be unique"],
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;

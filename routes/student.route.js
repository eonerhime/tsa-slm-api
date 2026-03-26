const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/student.controller");

// Create a new student
router.post("/new", createStudent);

// Get all students
router.get("/", getAllStudents);

// Get a student by ID
router.get("/:id", getStudentById);

// Update a student by ID
router.put("/:id", updateStudentById);

// Delete a student by ID
router.delete("/:id", deleteStudentById);

module.exports = router;

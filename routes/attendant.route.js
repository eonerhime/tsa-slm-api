const express = require("express");
const router = express.Router();

const {
  createAttendant,
  getAllAttendants,
  getAttendantById,
  updateAttendantById,
  deleteAttendantById,
} = require("../controllers/attendant.controller");

// Create a new library attendant
router.post("/new", createAttendant);

// Get all library attendants
router.get("/", getAllAttendants);

// Get a library attendant by ID
router.get("/:id", getAttendantById);

// Update a library attendant by ID
router.put("/:id", updateAttendantById);

// Delete a library attendant by ID
router.delete("/:id", deleteAttendantById);

module.exports = router;

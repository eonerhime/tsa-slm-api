const express = require("express");
const router = express.Router();

const {
  createLibraryAttendant,
  getAllLibraryAttendants,
  getLibraryAttendantById,
  updateLibraryAttendantById,
  deleteLibraryAttendantById,
} = require("../controllers/library-attendant.controller");

// Create a new library attendant
router.post("/new", createLibraryAttendant);

// Get all library attendants
router.get("/", getAllLibraryAttendants);

// Get a library attendant by ID
router.get("/:id", getLibraryAttendantById);

// Update a library attendant by ID
router.put("/:id", updateLibraryAttendantById);

// Delete a library attendant by ID
router.delete("/:id", deleteLibraryAttendantById);

module.exports = router;

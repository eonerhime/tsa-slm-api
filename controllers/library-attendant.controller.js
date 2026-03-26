const LibraryAttendants = require("../models/library-attendant.model");

/*
Sample data for creating a library attendant:
{
  "name": "John Doe",
  "staffId": "LA12345"
}
*/

// Create a new library attendant
const createLibraryAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;

    if (!name || !staffId) {
      return res
        .status(400)
        .json({ message: "Name and staff ID are required" });
    }

    const libraryAttendant = await LibraryAttendants.create({ name, staffId });
    res.status(201).json(libraryAttendant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all library attendants
const getAllLibraryAttendants = async (req, res) => {
  try {
    const libraryAttendants = await LibraryAttendants.find();
    res.status(200).json(libraryAttendants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single library attendant by ID
const getLibraryAttendantById = async (req, res) => {
  try {
    const { id } = req.params;
    const libraryAttendant = await LibraryAttendants.findById(id);

    if (!libraryAttendant) {
      return res.status(404).json({ message: "Library attendant not found" });
    }

    res.status(200).json(libraryAttendant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
Sample data for updating a library attendant:
{
  "name": "Jane Doe",
  "staffId": "LA12345"
}
*/
// Update a library attendant by ID
const updateLibraryAttendantById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, staffId } = req.body;

    if (!name && !staffId) {
      return res
        .status(400)
        .json({ message: "Name and staff ID are required" });
    }

    const libraryAttendant = await LibraryAttendants.findByIdAndUpdate(
      id,
      { name, staffId },
      { new: true, runValidators: true },
    );

    if (!libraryAttendant) {
      return res.status(404).json({ message: "Library attendant not found" });
    }

    res.status(200).json(libraryAttendant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a library attendant by ID
const deleteLibraryAttendantById = async (req, res) => {
  try {
    const { id } = req.params;
    const libraryAttendant = await LibraryAttendants.findByIdAndDelete(id);

    if (!libraryAttendant) {
      return res.status(404).json({ message: "Library attendant not found" });
    }

    res.status(200).json({ message: "Library attendant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLibraryAttendant,
  getAllLibraryAttendants,
  getLibraryAttendantById,
  updateLibraryAttendantById,
  deleteLibraryAttendantById,
};

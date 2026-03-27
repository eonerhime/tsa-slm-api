const Attendant = require("../models/attendant.model");

/*
Sample data for creating a library attendant:
{
  "name": "John Doe",
  "staffId": "LA12345"
}
*/

// Create a new library attendant
const createAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;

    if (!name || !staffId) {
      return res
        .status(400)
        .json({ message: "Name and staff ID are required" });
    }

    const attendant = await Attendant.create({ name, staffId });
    res.status(201).json(attendant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all library attendants
const getAllAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();
    res.status(200).json(attendants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single library attendant by ID
const getAttendantById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendant = await Attendant.findById(id);

    if (!attendant) {
      return res.status(404).json({ message: "Library attendant not found" });
    }

    res.status(200).json(attendant);
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
const updateAttendantById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, staffId } = req.body;

    if (!name && !staffId) {
      return res
        .status(400)
        .json({ message: "Name and staff ID are required" });
    }

    const attendant = await Attendant.findByIdAndUpdate(
      id,
      { name, staffId },
      { new: true, runValidators: true },
    );

    if (!attendant) {
      return res.status(404).json({ message: "Library attendant not found" });
    }

    res.status(200).json(attendant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a library attendant by ID
const deleteAttendantById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendant = await Attendant.findByIdAndDelete(id);

    if (!attendant) {
      return res.status(404).json({ message: "Library attendant not found" });
    }

    res.status(200).json({ message: "Library attendant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAttendant,
  getAllAttendants,
  getAttendantById,
  updateAttendantById,
  deleteAttendantById,
};

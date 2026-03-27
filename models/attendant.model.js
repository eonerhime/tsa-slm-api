const mongoose = require("mongoose");

const AttendantSchema = mongoose.Schema(
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

const Attendant = mongoose.model("Attendant", AttendantSchema);

module.exports = Attendant;

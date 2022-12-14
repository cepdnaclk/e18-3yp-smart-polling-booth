const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  provinceID: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Southern",
      "Western",
      "Central",
      "Nothern",
      "Eastern",
      "North-Eastern",
      "Sabaragamuwa",
      "Wayamba",
      "Uva",
    ],
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  voterCount: {
    type: Number,
    required: true,
  },
});

const Division = mongoose.model("Division", districtSchema);

exports.Voter = Division;

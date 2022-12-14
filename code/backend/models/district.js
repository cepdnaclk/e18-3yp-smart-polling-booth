const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  provinceID: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Matara",
      "Galle",
      "Hambantota",
      "Kalutara",
      "Colombo",
      "Kegalle",
      "Kandy",
      "Matale",
      "Anuradhapura",
      "Polonnaruwa",
      "Vauniya",
      "Madakalauwa",
      "Ampara",
      "Gampaha",
      "Nuwara Eliya",
      "Jaffna",
      "Mannar",
      "Mulathiv",
      "Kilinochchi",
      "Batticaloa",
      "Trincomalee",
      "Kurunagala",
      "Puttalam",
      "Badulla",
      "Monaragala",
      "Rathnapura",
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
});

const Division = mongoose.model("Division", districtSchema);

exports.Voter = Division;

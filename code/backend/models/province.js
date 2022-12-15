const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  provinceID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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
  voterCount: {
    type: Number,
    required: true,
  },
});

const Province = mongoose.model("Province", provinceSchema);

exports.Province = Province;

const mongoose = require("mongoose");
const Province = require("./province");
// const Fawn = require("fawn");

// Fawn.init(mongoose);

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Badulla", "Colombo", "Kandy", "Mathara"],
  },
  regVoteCount: {
    type: Number,
    required: true,
  },
  currentVoteCount: {
    type: Number,
    default: 0,
  },
  provinceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true,
  },
});

const District = mongoose.model("District", districtSchema);

exports.District = District;

const mongoose = require("mongoose");
const Province = require("./province");
// const Fawn = require("fawn");

// Fawn.init(mongoose);

const districtSchema = new mongoose.Schema({
  districtID: {
    type: String,
    required: true,
    // unique: false,
    enum: ["D01", "D02", "D03"],
  },
  name: {
    type: String,
    required: true,
    // unique: false,
    enum: ["D-01", "D-02", "D-03"],
  },
  regVoteCount: {
    type: Number,
    required: true,
  },
  currentVoteCount: {
    type: Number,
    required: true,
    default: 0,
  },
  provinceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
  },
});

const District = mongoose.model("District", districtSchema);

exports.District = District;

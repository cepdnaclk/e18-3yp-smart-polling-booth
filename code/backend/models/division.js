const mongoose = require("mongoose");
const District = require("./district");
const Province = require("./province");
// const Fawn = require("fawn");
// Fawn.init(mongoose);

const divisionSchema = new mongoose.Schema({
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
  publicKeyPath: {
    type: String,
    unique: true,
  },
  districtID: {
    type: mongoose.Schema.Types.ObjectId,
    unique: false,
    ref: "District",
    required: true,
  },
});

const Division = mongoose.model("Division", divisionSchema);

exports.Division = Division;

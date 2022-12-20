const mongoose = require("mongoose");
const District = require("./district");
const Province = require("./province");
// const Fawn = require("fawn");
// Fawn.init(mongoose);

const divisionSchema = new mongoose.Schema({
  divisionID: {
    type: String,
    required: true,
    unique: true,
    enum: ["Div01", "Div02", "Div03", "Div04", "Div05"],
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Div-01", "Div-02", "Div-03"],
  },
  regVoteCount: {
    type: Number,
    required: true,
  },
  currentVoteCount: {
    required: true,
    type: Number,
    default: 0,
  },
  districtID: {
    type: mongoose.Schema.Types.ObjectId,
    unique: false,
    ref: "District",
  },
  provinceID: {
    type: mongoose.Schema.Types.ObjectId,
    unique: false,
    ref: "Province",
  },
});

const Division = mongoose.model("Division", divisionSchema);

exports.Division = Division;

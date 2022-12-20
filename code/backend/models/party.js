const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Party-01", "Party-02", "Party-03"],
  },
  voteCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Party = mongoose.model("Party", partySchema);

exports.Party = Party;

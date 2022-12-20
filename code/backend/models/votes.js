const mongoose = require("mongoose");
const { Division } = require("./division");

const votesSchema = new mongoose.Schema({
  voteID: {
    type: String,
    required: true,
    unique: true,
  },
  party: {
    type: String,
    required: true,
    default: "",
  },
  time: {
    type: String,
    default: Date.now(),
    required: true,
  },
  divisionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
  },
});

const Votes = mongoose.model("Votes", votesSchema);

exports.Votes = Votes;

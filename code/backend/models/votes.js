const mongoose = require("mongoose");
const { Division } = require("./division");

const votesSchema = new mongoose.Schema({
  party: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
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

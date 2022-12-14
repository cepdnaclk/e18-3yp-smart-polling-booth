const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  voteID: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
    default: Date.now(),
  },
  divisionID: {
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
});

const Voting = mongoose.model("Voting", votingSchema);

exports.Voter = Voting;

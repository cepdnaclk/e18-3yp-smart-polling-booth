const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    validate: function (value) {
      value.length > 3;
    },
  },
  lname: {
    type: String,
    required: true,
    validate: function (value) {
      value.length > 3;
    },
  },
  division: {
    type: String,
    required: true,
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
  nic: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12,
    unique: true,
  },
  regDate: { type: String, required: true },
  fingerprintImg: { type: String, required: true },
  faceRecImg: { type: String, required: true },
  isVoted: { type: Boolean, required: true },
  contactNumber: { type: Number, required: true },
});

const Voter = mongoose.model("Voter", voterSchema);

exports.Voter = Voter;

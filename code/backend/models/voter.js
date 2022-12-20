const mongoose = require("mongoose");
const { Division } = require("./division");

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
    required: true,
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
  isVoted: { type: Boolean, default: false },
  contactNumber: { type: Number, required: true },
});

const Voter = mongoose.model("Voter", voterSchema);

exports.Voter = Voter;

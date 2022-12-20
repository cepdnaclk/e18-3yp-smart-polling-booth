const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  provinceID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Pro-01", "Pro-02", "Pro-03"],
  },
  regVoteCount: {
    type: Number,
    required: true,
  },
  currentVoteCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Province = mongoose.model("Province", provinceSchema);

exports.Province = Province;

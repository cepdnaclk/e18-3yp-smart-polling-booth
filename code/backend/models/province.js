const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Northern"
          ,"North Western"
          ,"Western	Colombo"
          ,"North Central"
          ,"Central"
          ,"Sabaragamuwa"
          ,"Eastern"
          ,"Uva"
          ,"Southern"],
  },
  regVoteCount: {
    type: Number,
    required: true,
  },
  currentVoteCount: {
    type: Number,
    default: 0,
  },
});

const Province = mongoose.model("Province", provinceSchema);

exports.Province = Province;

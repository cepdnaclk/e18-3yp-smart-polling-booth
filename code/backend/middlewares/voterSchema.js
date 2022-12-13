import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  division: String,
  nic: String,
  regDate: Date,
  fingerprintImg: String,
  faceRecImg: String,
  isVoted: Boolean,
  contactNumber: Number,
});

module.exports = candidateSchema;

const mongoose = require("mongoose");
// const { Division } = require("./division");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    // validate: [validateEmail, "Please fill a valid email address"],
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please fill a valid email address",
    // ],
  },
  password: {
    type: String,
    required: true,
    default: "admin",
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  contactNumber: {
    type: Number,
    required: true,
    length: 10,
    unique: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

var validateEmail = function (email) {
  var result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return result.test(email);
};

exports.Admin = Admin;

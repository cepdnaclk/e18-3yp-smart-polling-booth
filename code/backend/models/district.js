const mongoose = require("mongoose");
const Province = require("./province");
// const Fawn = require("fawn");

// Fawn.init(mongoose);

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Jaffna"
            ,"Kilinochchi"
            ,"Mannar"
            ,"Mullaitivu"
            ,"Vavuniya"
            ,"Puttalam"
            ,"Kurunegala"
            ,"Gampaha"
            ,"Colombo"
            ,"Kalutara"
            ,"Anuradhapura"
            ,"Polonnaruwa"
            ,"Matale"
            ,"Kandy"
            ,"Nuwara Eliya"
            ,"Kegalle"
            ,"Ratnapura"
            ,"Trincomalee"
            ,"Batticaloa"
            ,"Ampara"
            ,"Badulla"
            ,"Monaragala"
            ,"Hambantota"
            ,"Matara"
            ,"Galle"],
  },
  regVoteCount: {
    type: Number,
    required: true,
  },
  currentVoteCount: {
    type: Number,
    default: 0,
  },
  provinceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true,
  },
});

const District = mongoose.model("District", districtSchema);

exports.District = District;

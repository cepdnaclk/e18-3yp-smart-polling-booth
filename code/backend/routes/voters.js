const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

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
  nic: { type: String, required: true, minlength: 10, maxlength: 12 },
  regDate: { type: Date },
  fingerprintImg: { type: String, required: true },
  faceRecImg: { type: String, required: true },
  isVoted: { type: Boolean, required: true },
  contactNumber: { type: Number, required: true },
});

const Voter = mongoose.model("Voter", voterSchema);

// get al voters
router.get("/", async (req, res) => {
  const voters = await Voter.find();
  console.log("Get Called");
  res.send(voters);
});

router.post("/", async (req, res) => {
  const { error } = validateVoters(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let voter = new Voter({
    fname: req.body.fname,
    lname: req.body.lname,
    division: req.body.division,
    nic: req.body.nic,
    regDate: req.body.regDate,
    fingerprintImg: req.body.fingerprint,
    faceRecImg: req.body.faceRecImg,
    isVoted: req.body.isVoted,
    contactNumber: req.body.contactNumber,
  });

  voter = await voter.save();

  res.send(voter);
  console.log("Post Called");
});

router.put("/:id", async (req, res) => {
  const { error } = validateVoters(req.body);
  if (error) return res.status(400).send(error.details[0].messages);

  // find the relevent voter and make he as voted
  const voter = Voter.findOneAndUpdate(
    req.params.nic,
    { isVoted: true },
    { new: true }
  );

  //   if there is no voter
  if (!voter)
    return res
      .status(400)
      .send("The voter with given nic is not registered votre");

  // if there is a voter and updated the voting status, response this.
  res.send(voter);
  console.log("Put Called");
});

router.delete("/:id", async (req, res) => {
  const deletingVoter = await Voter.findOneAndRemove(req.params.nic);

  if (!deletingVoter)
    return res.status(404).send("The voter with the given ID was not found.");

  res.send(deletingVoter);
  console.log("Delete Called");
});

router.get("/:id", async (req, res) => {
  const voter = await Voter.findOne(req.params.nic);

  if (!voter)
    return res.status(404).send("The voter with the given ID was not found.");

  res.send(voter);
  console.log("Get one Voter Called");
});

function validateVoters(voter) {
  const schema = {
    fname: Joi.string().min(3).max(255).required(),
    lname: Joi.string().min(3).max(255).required(),
    division: Joi.string()
      .valid(
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
        "Rathnapura"
      )
      .required(),
    nic: Joi.string().min(10).max(12).required(),
    regDate: Joi.date().less("1-1-2004"),
    fingerprintImg: Joi.string().required(),
    faceRecImg: Joi.string().required(),
    isVoted: Joi.boolean().required,
    contactNumber: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
  };

  return Joi.validate(voter, schema);
}

module.exports = router;

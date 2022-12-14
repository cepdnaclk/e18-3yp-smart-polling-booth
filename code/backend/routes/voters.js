// const Joi = require("joi");
const { Voter } = require("../models/voter");
const { Division } = require("../models/division");
const { District } = require("../models/district");
const { Province } = require("../models/province");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// get all voters (done)
router.get("/", async (req, res) => {
  const voters = await Voter.find();
  res.send(voters);
  // console.log(voters);
  console.log("Get Called");
});

// add a voter (done)
router.post("/", async (req, res) => {
  const voter = new Voter({
    fname: req.body.fname,
    lname: req.body.lname,
    division: req.body.division,
    nic: req.body.nic,
    regDate: req.body.regDate,
    fingerprintImg: req.body.fingerprintImg,
    faceRecImg: req.body.faceRecImg,
    contactNumber: req.body.contactNumber,
  });

  console.log(req.body);
  try {
    const newVoter = await voter.save();
    return res.status(200).json(newVoter);
    console.log("voter created successfully");
  } catch (ex) {
    return res.status(404).json({ messge: "You Cannot vote", err: ex });
  }
});

// vote by the voter
router.put("/:id", async (req, res) => {
  // const { error } = validateVoters(req.body);
  // if (error) return res.status(400).send(error.details[0].messages);

  // find the relevent voter and make he as voted
  // const voter = await Voter.findOneAndUpdate(
  const voter = await Voter.findById(req.params.id);
  // voter.isVoted = true;
  // voter.save();

  const divisionID = voter.division;
  const division = await Division.findById(divisionID);
  division.currentVoteCount = division.currentVoteCount + 1;
  await division.save();

  const districtID = division.districtID;
  const district = await District.findById(districtID);
  district.currentVoteCount = district.currentVoteCount + 1;
  await district.save();

  const provinceID = district.provinceID;
  const province = await Province.findById(provinceID);
  province.currentVoteCount = province.currentVoteCount + 1;
  await province.save();

  res.send(divisionID);

  // const voter = await Voter.findByIdAndUpdate(
  //   req.params.id,
  //   { isVoted: true }
  //   // { new: true }
  // );
  // //   if there is no voter
  // if (!voter)
  //   return res
  //     .status(400)
  //     .send("The voter with given NIC is not a registered voter");
});

// delete a voter (by the admins) (done)
router.delete("/:id", async (req, res) => {
  try {
    const deletingVoter = await Voter.findByIdAndRemove(req.params.id);
    res.send(deletingVoter);
    console.log(deletingVoter);
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("The voter with the given ID was not found");
  }

  // if (!deletingVoter)
  //   return res.status(404).send("The voter with the given ID was not found.");

  // res.send(deletingVoter);
  console.log("Delete Called");
});

// get a voter (by the admin)
router.get("/:id", async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    res.send(voter);
    console.log(voter);
  } catch (err) {
    return res.status(404).send("The voter with the given ID was not found.");
  }
  // if (!voter) res.send(voter);
  console.log("Get one Voter Called");
});

// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string().min(3).required()
//   };

//   return Joi.validate(genre, schema);
// }

// validating the voter
// function validateVoters(voter) {
//   const schema = {
//     fname: Joi.string().min(3).max(255).required(),
//     lname: Joi.string().min(3).max(255).required(),
//     division: Joi.string()
//       .valid(
//         "Matara",
//         "Galle",
//         "Hambantota",
//         "Kalutara",
//         "Colombo",
//         "Kegalle",
//         "Kandy",
//         "Matale",
//         "Anuradhapura",
//         "Polonnaruwa",
//         "Vauniya",
//         "Madakalauwa",
//         "Ampara",
//         "Gampaha",
//         "Nuwara Eliya",
//         "Jaffna",
//         "Mannar",
//         "Mulathiv",
//         "Kilinochchi",
//         "Batticaloa",
//         "Trincomalee",
//         "Kurunagala",
//         "Puttalam",
//         "Badulla",
//         "Monaragala",
//         "Rathnapura"
//       )
//       .required(),
//     nic: Joi.string().min(10).max(12).required(),
//     regDate: Joi.date().less("1-1-2004"),
//     fingerprintImg: Joi.string().required(),
//     faceRecImg: Joi.string().required(),
//     isVoted: Joi.boolean().required,
//     contactNumber: Joi.string()
//       .regex(/^[0-9]{10}$/)
//       .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
//       .required(),
//   };

//   // return Joi.validate(voter, schema);
//   return Joi.validate(voter, schema);

//   // const validation = schema.validate(voter);
//   // return validation;
// }

module.exports = router;

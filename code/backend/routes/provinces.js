const { Province } = require("../models/province");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// get all provinces
router.get("/", async (req, res) => {
  const provinces = await Province.find();
  console.log("Get Called");
  res.send(provinces);
});

// add a province
router.post("/add", async (req, res) => {
  const province = new Province({
    name: req.body.name,
    regVoteCount: req.body.regVoteCount,
    provinceID: req.body.provinceID,
  });

  try {
    const newProvince = await province.save();
    console.log("province created successfully");
    return res.status(201).json({ message: "successfully added province" });
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).json({ message: "Province Cannot Be Saved" });
  }
});
/*----------------------------------------------------------------
// vote by the voter
router.put("/:id", async (req, res) => {
  // const { error } = validateVoters(req.body);
  // if (error) return res.status(400).send(error.details[0].messages);

  // find the relevent voter and make he as voted
  // const voter = await Voter.findOneAndUpdate(
  const voter = await Province.findByIdAndUpdate(
    req.params.id,
    { isVoted: true }
    // { new: true }
  );

  //   if there is no voter
  if (!voter)
    return res
      .status(400)
      .send("The voter with given NIC is not a registered voter");

  // if there is a voter and updated the voting status, response this.
  res.send(voter);
  console.log("Put Called");
});

// delete a voter (by the admins) (done)
router.delete("/:id", async (req, res) => {
  try {
    const deletingVoter = await Province.findByIdAndRemove(req.params.id);
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
    const voter = await Province.findById(req.params.id);
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

----------------------------------------------------------------*/
module.exports = router;

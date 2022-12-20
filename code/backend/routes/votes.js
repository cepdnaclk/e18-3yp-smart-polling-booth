const { Votes } = require("../models/votes");
const { Division } = require("../models/division");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// get all voters (done)
router.get("/", async (req, res) => {
  const votes = await Votes.find();
  console.log("Get Called");
  res.send(votes);
});

// add a votes (done)
router.post("/", async (req, res) => {
  const votes = new Votes({
    voteID: req.body.voteID,
    party: req.body.party,
    time: req.body.time,
    divisionID: req.body.divisionID,
  });

  console.log(votes);

  try {
    const newVote = await votes.save();
    res.send(newVote);
    console.log("Vote created successfully");
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("You Cannot vote");
  }

  console.log("Post a voter Called");
});

// vote by the voter
router.put("/:id", async (req, res) => {
  // const { error } = validateVoters(req.body);
  // if (error) return res.status(400).send(error.details[0].messages);

  // find the relevent voter and make he as voted
  // const voter = await Voter.findOneAndUpdate(
  const voterID = req.params.id;
  const divisionID = req.body.division;
  const voter = await Vote.findByIdAndUpdate(
    voterID,
    { isVoted: true }
    // { new: true }
  );

  //   if there is no voter
  if (!voter)
    return res
      .status(400)
      .send("The voter with given NIC is not a registered voter");

  // if there is a voter and updated the voting status, response this.

  console.log(divisionID);
  const division = await Division.find({ _id: divisionID });
  console.log(division);
  res.send(voter);
  console.log("Put Called");
});

// delete a voter (by the admins) (done)
router.delete("/:id", async (req, res) => {
  try {
    const deletingVoter = await Vote.findByIdAndRemove(req.params.id);
    res.send(deletingVoter);
    console.log(deletingVoter);
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("The voter with the given ID was not found");
  }

  console.log("Delete Called");
});

// get a voter (by the admin)
router.get("/:id", async (req, res) => {
  try {
    const voter = await Vote.findById(req.params.id);
    res.send(voter);
    console.log(voter);
  } catch (err) {
    return res.status(404).send("The voter with the given ID was not found.");
  }
  // if (!voter) res.send(voter);
  console.log("Get one Voter Called");
});

module.exports = router;

const { Party } = require("../models/party");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// get all parties
router.get("/", async (req, res) => {
  const parties = await Party.find();
  console.log("Get Called");
  res.send(parties);
});

// add a party
router.post("/", async (req, res) => {
  const party = new Party({
    name: req.body.name,
    voteCount: req.body.voteCount,
  });

  console.log(party);

  try {
    const newParty = await party.save();
    res.send(newParty);
    console.log("party created successfully");
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("party Cannot Be Saved");
  }

  console.log("Post a party Called");
});

module.exports = router;

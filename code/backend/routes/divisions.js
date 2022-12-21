const { Division } = require("../models/division");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const Fawn = require("fawn");
const { District } = require("../models/district");

// Fawn.init(mongoose);

// get all divisions
router.get("/", async (req, res) => {
  const divisions = await Division.find().populate("districtID", "name -_id");
  console.log("Get Called");
  return res.json(divisions);
});

// add a division
router.post("/add", async (req, res) => {
  const division = new Division({
    name: req.body.name,
    regVoteCount: req.body.regVoteCount,
    districtID: req.body.districtID,
  });

  console.log(division);

  try {
    const newDivision = await division.save();

    return res.status(201).json({ message: "successfully added the division" });
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).json({ message: "Division Cannot Be Saved" });
  }
});

// get district
router.get("/:id", async (req, res) => {
  try {
    const division = await Division.findById(req.params.id)
      .populate("provinceID", "name -_id voterCount")
      .select("name voterCount");
    res.send(division);
  } catch (err) {
    return res.status(404).send("The voter with the given ID was not found.");
  }
});

module.exports = router;

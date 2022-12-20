const { Division } = require("../models/division");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const Fawn = require("fawn");
const { District } = require("../models/district");

// Fawn.init(mongoose);

// get all divisions
router.get("/", async (req, res) => {
  // const divisions = await Division.find().populate("districtID", "name -_id");
  const divisions = await Division.find();
  // .populate("districtID", "name -_id")
  // const divisions = await Division.find()
  // .populate("districtID")
  // .populate("provinceID");
  console.log("Get Called");
  res.send(divisions);
});

// add a division
router.post("/", async (req, res) => {
  const division = new Division({
    divisionID: req.body.divisionID,
    name: req.body.name,
    regVoteCount: req.body.regVoteCount,
    currentVoteCount: req.body.currentVoteCount,
    districtID: req.body.districtID,
    provinceID: req.body.provinceID,
  });

  console.log(division);

  try {
    const newDivision = await division.save();

    // new Fawn.Task()
    //   .update(
    //     "district",
    //     { districtID: District.districtID },
    //     {
    //       $inc: { currentVoteCount: +1 },
    //     }
    //   )
    //   .run();

    res.send(newDivision);
    console.log("Division created successfully");
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send(ex);
  }

  console.log("Post a Division Called");
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

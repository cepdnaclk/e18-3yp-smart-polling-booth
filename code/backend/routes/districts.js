const { District } = require("../models/district");
const mongoose = require("mongoose");
const express = require("express");
const { Province } = require("../models/province");
const router = express.Router();

// get all districts
router.get("/", async (req, res) => {
  const districts = await District.find().populate("provinceID", "name -_id");
  console.log("Get Called");
  res.send(districts);
});

// add a Dictrict
router.post("/", async (req, res) => {
  const district = new District({
    districtID: req.body.districtID,
    name: req.body.name,
    regVoteCount: req.body.voterCount,
    currentVoteCount: req.body.currentVoteCount,
    provinceID: req.body.provinceID,
  });

  console.log(district);

  try {
    const newProvince = await district.save();
    res.send(newProvince);
    console.log("District created successfully");
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("District Cannot Be Saved");
  }
  console.log("Post a District Called");
});

// get district
router.get("/:id", async (req, res) => {
  try {
    const district = await District.findById(req.params.id)
      .populate("provinceID", "name -_id voterCount")
      .select("name voterCount");
    res.send(district);
  } catch (err) {
    return res.status(404).send("The voter with the given ID was not found.");
  }
});

module.exports = router;

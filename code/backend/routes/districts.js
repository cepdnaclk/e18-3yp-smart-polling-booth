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
router.post("/add", async (req, res) => {
  const district = new District({
    name: req.body.name,
    regVoteCount: req.body.regVoteCount,
    provinceID: req.body.provinceID,
  });

  try {
    const newDistrict = await district.save();
    console.log("District created successfully");
    return res.status(201).json({ message: "successfully added the district" });
  } catch (ex) {
    return res.status(404).json({ message: "District Cannot Be Saved" });
  }
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

const { District } = require("../models/district");
const express = require("express");
const router = express.Router();

// get all districts
router.get("/", async (req, res) => {
  const districts = await District.find();
  console.log("Get Called");
  res.send(districts);
});

// add a Dictrict
router.post("/", async (req, res) => {
  const district = new District({
    provinceID: req.body.provinceID,
    name: req.body.name,
    voterCount: req.body.voterCount,
  });

  try {
    const newProvince = await district.save();
    res.send(newProvince);
    console.log("province created successfully");
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("Province Cannot Be Saved");
  }

  console.log("Post a province Called");
});

module.exports = router;

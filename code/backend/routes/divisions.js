const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const { Division } = require("../models/division");
const { District } = require("../models/district");

const serverPublicKeyPath = "./middlewares/keys/serverKeys/public.pem";

//Initialize booth
router.post("/initialize", async (req, res) => {
  console.log(req.body.public_key);
  try {
    const divisionName = req.body.division;
    const public_key_path = `./middlewares/keys/divisionPublicKeys/${divisionName}_public_key.pem`;
    const public_key = req.body.public_key;

    fs.writeFileSync(public_key_path, public_key, "utf8");

    await Division.findOneAndUpdate(
      { name: divisionName },
      { publicKeyPath: public_key_path },
      (err, doc) => {
        if (err) {
          return res.status(488).json({ message: "Cannot initialize divison" });
        }
        console.log(doc);

        if (doc === null) {
          return res.status(400).json({
            message: `Cannot find division named ${divisionName}. Please register the division`,
          });
        } else {
          const serverPublicKey = fs.readFileSync(serverPublicKeyPath, "utf8");
          return res
            .status(200)
            .json({ success: true, serverPublicKey: serverPublicKey });
        }
      }
    );
  } catch (err) {}
});

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
    publicKeyPath: req.body.name,
    districtID: req.body.districtID,
  });

  try {
    const newDivision = await division.save();

    return res.status(201).json({ message: "successfully added the division" });
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
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

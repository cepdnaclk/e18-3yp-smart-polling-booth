const { Admin } = require("../models/admin");
const { Division } = require("../models/division");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// get all admins (done)
router.get("/", async (req, res) => {
  const admins = await Admin.find();
  console.log("Get Called");
  res.send(admins);
});

// add a admin (done)
router.post("/", async (req, res) => {
  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    contactNumber: req.body.contactNumber,
  });

  console.log(admin);

  try {
    const newAdmin = await admin.save();
    res.send(newAdmin);
    console.log("New Admin created successfully");
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("You Cannot be an Admin");
  }

  console.log("Post a New Admin Called");
});

// admin logins
router.post("/login", async (req, res) => {
  console.log(req.body);

  const adminByEmail = await Admin.findOne({ email: req.body.email });
  if (!adminByEmail)
    return res
      .status(201)
      .json({ success: false, message: "Wrong credentials!" });

  try {
    return res.status(200).json({
      message: "succesfully authenticated",
      user: { email: adminByEmail.email, username: adminByEmail.username },
    });
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("You Cannot be an Admin");
  }

  console.log("Post a New Admin Called");
});

// delete a admin (by the admins) (done)
router.delete("/:id", async (req, res) => {
  try {
    const deletingAdmin = await Admin.findByIdAndRemove(req.params.id);
    res.send(deletingAdmin);
    console.log(deletingAdmin);
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("The Admin with the given ID was not found");
  }

  console.log("Delete Called");
});

// get a admin (by the admin)
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.send(admin);
    console.log(admin);
  } catch (err) {
    return res.status(404).send("The voter with the given ID was not found.");
  }
  // if (!voter) res.send(voter);
  console.log("Get one Voter Called");
});

module.exports = router;

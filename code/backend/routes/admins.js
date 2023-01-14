const Admin = require("../models/admin");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

let refreshTokens = [];

/*************** post method to sign up a user to the database *****************************/

router.post("/signup", async (req, res) => {
  try {
    const adminByEmail = await Admin.findOne({ email: req.body.email });
    if (adminByEmail) {
      return res
        .status(200)
        .json({ success: false, message: "This Email already in use." });
    }

    // encrypt the password - for security purposes
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newAdmin = await Admin({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // store the encrypted password
      name: req.body.name,
      contactNumber: req.body.contactNumber,
    });

    const admin = await newAdmin.save();
    console.log(admin);
    return res.status(200).json({
      success: true,
      message: "The Signup Request sent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      success: true,
      message: "Admin cannot be entered to the system.",
    });
  }
});

/****************** post method to login a user *****************************/

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(200)
        .json({ success: false, message: "Please give credentials" });

    // check whether the user has already signed up
    const adminByEmail = await Admin.findOne({ email: req.body.email });

    if (!adminByEmail)
      return res
        .status(200)
        .json({ success: false, message: "Wrong credentials!" });

    const adminByPassword = await bcrypt.compare(
      req.body.password,
      adminByEmail.password
    );

    if (!adminByPassword)
      return res
        .status(200)
        .json({ success: false, message: "Wrong credentials!" });

    // create json web token and send it with the login request

    // access tokens for autherization
    const access_token = jwt.sign(
      {
        email: adminByEmail.email,
        username: adminByEmail.username,
        name: adminByEmail.name,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: process.env.REFRESH_TIME }
    );

    // refresh tokens to refresh the access token when expired
    const refresh_token = jwt.sign(
      {
        email: adminByEmail.email,
        username: adminByEmail.username,
        name: adminByEmail.name,
      },
      process.env.REFRESH_SECRET
    );
    refreshTokens.push(refresh_token); // refresh token will be expired at log out

    const user = {
      email: adminByEmail.email,
      username: adminByEmail.username,
      name: adminByEmail.name,
    };

    console.log(user);

    res.status(200).json({
      success: true,
      user,
      access_token: access_token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// log out
router.post("/logout", (req, res) => {
  const refreshToken = req.header("refresh_token");
  if (!refreshToken)
    return res.status(401).json({ message: "Authentication failed" });

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json({ message: "Successfuly logged out" });
});

// re-new access token
router.post("/token", (req, res) => {
  console.log("New access token generating ... \n");

  const refreshToken = req.header("refresh_token");
  if (!refreshToken) {
    console.log("No refresh token sent with the header\n");
    return res.status(401).json({ message: "Authentication failed" });
  }
  console.log(
    "this is the refresh token = " + req.header("refresh_token") + "\n"
  );

  if (!refreshTokens.includes(refreshToken)) {
    console.log(
      "refresh token sent with the header is not found in refreshTokens[] array\n"
    );
    console.log(refreshTokens);
    return res.status(403).json({ message: "Authentication failed" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, result) => {
    if (err) return res.status(500).json({ message: "Authentication failed" });

    console.log(result);

    const access_token = jwt.sign(
      {
        email: result.email,
        username: result.username,
        name: result.name,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: process.env.REFRESH_TIME }
    );

    console.log("new access token created = " + access_token + "\n");
    res.status(200).json({ access_token: access_token });
  });
});

module.exports = router;

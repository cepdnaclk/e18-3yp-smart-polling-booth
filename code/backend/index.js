const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const voters = require("./routes/voters");
const provinces = require("./routes/provinces");
const districts = require("./routes/districts");

mongoose
  .connect("mongodb://127.0.0.1/smart-polling-booth")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/voters", voters);
app.use("/api/provinces", provinces);
app.use("/api/districts", districts);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on ${port}...`));

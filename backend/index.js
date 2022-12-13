const mongoose = require("mongoose");
const express = require("express");
const app = express();
const voters = require("./routes/voters");

mongoose
  .connect("mongodb://localhost/smart-polling-booth")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use("/api/voters", voters);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

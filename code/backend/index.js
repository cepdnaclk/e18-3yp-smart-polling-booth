const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { Votes } = require("./models/votes");
const { Province } = require("./models/province");
const votes = require("./routes/votes");
const voters = require("./routes/voters");
const admins = require("./routes/admins");
const parties = require("./routes/parties");
const provinces = require("./routes/provinces");
const districts = require("./routes/districts");
const divisions = require("./routes/divisions");

mongoose
  .connect("mongodb://127.0.0.1/smartPollingBooth")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const uri = "mongodb://127.0.0.1/smartPollingBooth";
const client = new MongoClient(uri);

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res) => {
  try {
    console.log("called");
    // get current vote count
    const currentVoteCount = await Votes.estimatedDocumentCount();

    const db = client.db("smartPollingBooth");
    const collection_provinces = db.collection("provinces");

    const TotalVoters = await collection_provinces
      .aggregate([
        {
          $group: {
            _id: null,
            TotalVoters: { $sum: "$regVoteCount" },
          },
        },
      ])
      .toArray();

    const collection_divisions = db.collection("divisions");

    const TotalDivisions = await collection_divisions
      .aggregate([
        {
          $group: {
            _id: null,
            TotalDivisions: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const response = {
      currentVoteCount: currentVoteCount,
      TotalVoters: TotalVoters[0].TotalVoters,
      TotalDivisions: TotalDivisions[0].TotalDivisions,
    };

    console.log(response);

    res.status(200).json({ response });
  } catch (error) {}
});

app.use("/votes", votes);
app.use("/voters", voters);
app.use("/admins", admins);
app.use("/parties", parties);
app.use("/provinces", provinces);
app.use("/districts", districts);
app.use("/divisions", divisions);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on ${port}...`));

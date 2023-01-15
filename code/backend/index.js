const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Votes } = require("./models/votes");
const { Province } = require("./models/province");
const { Division } = require("./models/division");
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

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res) => {
  try {
    const x = new Date();
    const localTime = x.toLocaleString();
    console.log(localTime);

    var query = {};

    query.currentVoteCount = await Votes.estimatedDocumentCount();
    const timestamp = Date.now();

    console.log(timestamp);

    const startTime = new Date(timestamp);
    const endtTime = new Date(timestamp);

    startTime.setMinutes(startTime.getMinutes() - 60);
    endtTime.setMinutes(endtTime.getMinutes() - 40);

    console.log(startTime);

    await Votes.aggregate(
      [
        {
          $match: {
            createdAt: {
              $gt: startTime,
              $lt: endtTime,
            },
          },
        },
        {
          $group: {
            _id: "$party",
            count: { $sum: 1 },
            timestamps: { $push: "$createdAt" },
          },
        },
      ],
      (err, result1) => {
        if (err) throw err;
        // console.log(new Date(result1[0].timestamps[2]).getMinutes());
        query.hourlyVotes = result1;

        // Execute the second aggregate query
        Votes.aggregate(
          [
            {
              $group: {
                _id: "$party",
                count: { $sum: 1 },
              },
            },
          ],
          (err, result2) => {
            if (err) throw err;
            query.summary = result2;

            // Execute the second aggregate query
            Division.aggregate(
              [
                {
                  $group: {
                    _id: null,
                    TotalVoters: { $sum: "$regVoteCount" },
                    TotalDivisions: { $sum: 1 },
                  },
                },
              ],
              (err, result3) => {
                if (err) throw err;
                query.TotalVoters = result3[0].TotalVoters;
                query.TotalDivisions = result3[0].TotalDivisions;
                console.log(query);
                res.status(200).json(query);
              }
            );
          }
        );
      }
    );
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

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
  var query = {};
  try {
    console.log("called");
    // calculate currentvoted count
    query.currentVoteCount = await Votes.estimatedDocumentCount();

    await Province.aggregate(
      [
        {
          $group: {
            _id: null,
            TotalVoters: { $sum: "$regVoteCount" },
          },
        },
      ],
      (err, result1) => {
        if (err) throw err;
        console.log(result1);
        query.TotalVoters = result1[0].TotalVoters;

        // Execute the second aggregate query
        Division.aggregate(
          [
            {
              $group: {
                _id: null,
                TotalDivisions: { $sum: 1 },
              },
            },
          ],
          (err, result2) => {
            if (err) throw err;
            console.log(result2);
            query.TotalDivisions = result2[0].TotalDivisions;

            console.log(query);

            // Return the results of both queries to the client
            res.status(200).json(query);
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

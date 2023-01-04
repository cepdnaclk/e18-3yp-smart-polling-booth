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
    CSSConditionRule.log("called");
    // calculate currentvoted count
    query.currentVoteCount = await Votes.estimatedDocumentCount();

    // Calculate division count
    await Division.aggregate(
      [
        {
          $group: {
            _id: null,
            TotalVoters: { $um: "$regVoteCount" },
            TotalDivisions: { $sum: 1 },
          },
        },
      ],

      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          query.TotalVoters = result[0].TotalVoters;
          query.TotalDivisions = result[0].TotalDivisions;
        }
      }
    );

    console.log(query);
    return res.status(200).json(query);
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

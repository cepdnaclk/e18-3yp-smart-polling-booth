const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
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
const encrypt = require("./middlewares/encrrypt");
const decrypt = require("./middlewares/decrypt");
const generateRsaPair = require("./middlewares/generator");

generateRsaPair();

mongoose
  .connect("mongodb://127.0.0.1/smartPollingBooth")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const app = express();

app.use(express.json());
app.use(bodyParser.raw({ type: "application/octet-stream" }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res) => {
  try {
    var query = {};

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
      (err, result) => {
        if (err) throw err;
        query.TotalVoters = result[0].TotalVoters;
        query.TotalDivisions = result[0].TotalDivisions;
        console.log(query);

        res.status(200).json(query);
      }
    );
  } catch (error) {}
});

app.post("/test", async (req, res) => {
  try {
    // console.log(req);

    // const encrypt_msg = encrypt({ hello: "hello" });

    // console.dir(encrypt_msg);

    const decrypt_msg = decrypt(req.body);

    console.log(decrypt_msg);

    return res.send(decrypt_msg);
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

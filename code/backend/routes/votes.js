const { Votes } = require("../models/votes");
const { Division } = require("../models/division");
const express = require("express");
const router = express.Router();

// Get all votes
router.get("/", async (req, res) => {
  const votes = await Votes.find().populate("divisionID", "name -_id");
  res.status(200).json(votes);
});

// get current votes count
router.get("/currentVotes", async (req, res) => {
  const currentVoteCount = await Votes.estimatedDocumentCount();
  res.status(200).json({ currentVoteCount: currentVoteCount });
});

// add a votes (done)
router.post("/add", async (req, res) => {
  const division = await Division.findById(req.body.divisionID);
  console.log(division);

  if (!division) {
    return res.status(404).json({ message: "Invalid division" });
  }

  const votes = new Votes({
    party: req.body.party,
    divisionID: req.body.divisionID,
  });

  try {
    const newVote = await votes.save();
    return res.status(201).json({ message: "successfully recorded your vote" });
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("You Cannot vote");
  }
});

// add a votes (done)
router.post("/addwithEncrypt", async (req, res) => {
  const decrypt_msg = decrypt(req.body);
  console.log(decrypt_msg);

  return decrypt_msg;
  // const division = await Division.findById(req.body.divisionID);
  // console.log(division);

  // if (!division) {
  //   return res.status(404).json({ message: "Invalid division" });
  // }

  // const votes = new Votes({
  //   party: req.body.party,
  //   divisionID: req.body.divisionID,
  // });

  // try {
  //   const newVote = await votes.save();
  //   return res.status(201).json({ message: "successfully recorded your vote" });
  // } catch (ex) {
  //   // for (field in ex.errors) console.log(ex.errors[field].message);
  //   return res.status(404).send("You Cannot vote");
  // }
});

// vote by the voter
router.put("/:id", async (req, res) => {
  // const { error } = validateVoters(req.body);
  // if (error) return res.status(400).send(error.details[0].messages);

  // find the relevent voter and make he as voted
  // const voter = await Voter.findOneAndUpdate(
  const voterID = req.params.id;
  const divisionID = req.body.division;
  const voter = await Votes.findByIdAndUpdate(
    voterID,
    { isVoted: true }
    // { new: true }
  );

  //   if there is no voter
  if (!voter)
    return res
      .status(400)
      .send("The voter with given NIC is not a registered voter");

  // if there is a voter and updated the voting status, response this.

  console.log(divisionID);
  const division = await Division.find({ _id: divisionID });
  console.log(division);
  res.send(voter);
  console.log("Put Called");
});

// delete a voter (by the admins) (done)
router.delete("/:id", async (req, res) => {
  try {
    const deletingVoter = await Vote.findByIdAndRemove(req.params.id);
    res.send(deletingVoter);
    console.log(deletingVoter);
  } catch (ex) {
    // for (field in ex.errors) console.log(ex.errors[field].message);
    return res.status(404).send("The voter with the given ID was not found");
  }

  console.log("Delete Called");
});

// get a voter (by the admin)
// router.get("/:id", async (req, res) => {
//   try {
//     const voter = await Vote.findById(req.params.id);
//     res.send(voter);
//     console.log(voter);
//   } catch (err) {
//     return res.status(404).send("The voter with the given ID was not found.");
//   }
//   // if (!voter) res.send(voter);
//   console.log("Get one Voter Called");
// });

router.get("/summary", async (req, res) => {
  try {
    var query = {};

    await Votes.aggregate(
      [
        {
          $group: {
            _id: "$party",
            count: { $sum: 1 },
          },
        },
        { $limit: 6 },
      ],
      (err, result) => {
        if (err) throw err;
        // console.log(new Date(result1[0].timestamps[2]).getMinutes());
        query.summary = result;
        console.log(query);
        res.status(200).json(query);
      }
    );
  } catch (error) {}
});

router.get("/hourly-summary", (req, res) => {
  var query = { startTimes: [] };

  // get timesatamps for calculation
  const timestamp = Date.now();

  // set start and end time for 1st calculation
  var startTime = new Date(timestamp);
  var endtTime = new Date(timestamp);

  console.log(Math.round(startTime.getMinutes() / 10) * 10);

  startTime.setMinutes(Math.floor(startTime.getMinutes() / 10) * 10 - 60);
  endtTime.setMinutes(Math.floor(startTime.getMinutes() / 10) * 10 - 50);

  // console.log(startTime.toLocaleString());
  // console.log(endtTime.toLocaleString());

  console.log("start run promses");

  let data = [1, 2, 3, 4, 5, 6, 7];

  // Use a promise loop to perform the operation
  let promise = Promise.resolve();
  data.forEach((value) => {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // result += value;

          startTime.setMinutes(startTime.getMinutes() + 10);
          endtTime.setMinutes(endtTime.getMinutes() + 10);

          console.log(startTime);
          // console.log("y", endtTime);

          Votes.aggregate(
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
                },
              },
              { $limit: 3 },
            ],
            (err, result) => {
              if (err) throw err;

              // console.log(result);
              query.startTimes.push(startTime.toLocaleTimeString());
              query[value] = result;
            }
          );
          resolve();
        }, 1000);
      });
    });
  });
  promise.then(() => {
    // Send the result to the client
    // console.log(query);
    res.status(200).json(query);
  });
});

// router.get("/temp", async (req, res) => {
//   try {
//     var query = {};
//     console.log("called");

//     Votes.aggregate(
//       [
//         {
//           $group: {
//             _id: {
//               $bucket: {
//                 groupBy: "$createdAt",
//                 boundaries: [
//                   ISODate("2023-01-15T18:20:12.506Z"),
//                   ISODate("2023-01-15T18:30:12.506Z"),
//                   ISODate("2023-01-15T18:40:12.506Z"),
//                   ISODate("2023-01-15T18:50:12.506Z"),
//                   ISODate("2023-01-15T19:00:12.506Z"),
//                   ISODate("2023-01-15T19:10:12.506Z"),
//                   ISODate("2023-01-15T19:20:12.506Z"),
//                 ],
//                 // default: "Other",
//                 // output: {
//                 //   count: { $sum: 1 },
//                 // },
//               },
//             },
//           },
//         },
//       ],
//       (err, result) => {
//         if (err) throw err;
//         // query.TotalVoters = result[0].TotalVoters;
//         // query.TotalDivisions = result[0].TotalDivisions;
//         console.log(result);
//         // res.status(200).json(query);
//       }
//     );
//   } catch (error) {}
// });

module.exports = router;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/smart-polling-booth")
  .then(() => console.log("Connected to smart-polling-booth"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
//   .then(() => console.log("Connection Successfully established"))
//   .catch((err) => console.error("Connection Failed", err));

const voterSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    validate: function (value) {
      value.length > 3;
    },
  },
  lname: {
    type: String,
    required: true,
    validate: function (value) {
      value.length > 3;
    },
  },
  division: {
    type: String,
    required: true,
    enum: [
      "Matara",
      "Galle",
      "Hambantota",
      "Kalutara",
      "Colombo",
      "Kegalle",
      "Kandy",
      "Matale",
      "Anuradhapura",
      "Polonnaruwa",
      "Vauniya",
      "Madakalauwa",
      "Ampara",
      "Gampaha",
      "Nuwara Eliya",
      "Jaffna",
      "Mannar",
      "Mulathiv",
      "Kilinochchi",
      "Batticaloa",
      "Trincomalee",
      "Kurunagala",
      "Puttalam",
      "Badulla",
      "Monaragala",
      "Rathnapura",
    ],
  },
  nic: { type: String, required: true, minlength: 10, maxlength: 12 },
  regDate: { type: Date },
  fingerprintImg: { type: String, required: true },
  faceRecImg: { type: String, required: true },
  isVoted: { type: Boolean, required: true },
  contactNumber: { type: Number, required: true },
});

const Voter = mongoose.model("Voter", voterSchema);

async function regVoter() {
  const voter = new Voter({
    fname: "Dhananjaya-06",
    lname: "Weerasinghe",
    division: "Badulla",
    nic: "433456783V",
    regDate: "2017-03-08",
    fingerprintImg: "https:///dhana/fingImg",
    faceRecImg: "https:///dhana/faceRecImg",
    isVoted: false,
    contactNumber: "1234567891",
  });

  try {
    await voter.save();
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getVotes() {
  const voters = await Voter.find({ isVoted: true });
  console.log(voters);
}

async function vote(id) {
  const voter = await Voter.updateOne(
    { nic: id },
    {
      $set: {
        isVoted: true,
      },
    }
  );

  const result = await voter.save();
  // console.log(`${voter.nic} Voted successfully`);
  console.log("Voted");
}

async function deleteVoter(id) {
  const voter = await Voter.deleteOne({ nic: id });
  console.log(voter);
}

getVotes();
// vote("223456789V");
// deleteVoter("223456789V");
// regVoter();

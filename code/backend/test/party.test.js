const mongoose = require("mongoose");
const { Party } = require('../models/party');

describe("Party Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Party.deleteMany({});
  });

  it("should save a party with name and voteCount", async () => {
    const party = new Party({ name: "Party-01", voteCount: 10 });
    await party.save();
    const savedParty = await Party.findOne({ name: "Party-01" });
    expect(savedParty.name).toBe("Party-01");
    expect(savedParty.voteCount).toBe(10);
  });

  it("should not save a party with invalid name", async () => {
    const party = new Party({ name: "Invalid", voteCount: 10 });
    let error;
    try {
      await party.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name.kind).toBe("enum");
  });
});

const mongoose = require("mongoose");
const { Division } = require("../modesl/division");
const { Votes } = require("../models/votes");
const { expect } = require("chai");

describe("Votes Model", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("should have a party field of type String", () => {
    expect(Votes.schema.path("party")).to.have.property("instance", "String");
  });

  it("should have a createdAt field of type Date", () => {
    expect(Votes.schema.path("createdAt")).to.have.property("instance", "Date");
  });

  it("should have a default value for the createdAt field", () => {
    expect(Votes.schema.path("createdAt").defaultValue).to.exist;
  });

  it("should have a divisionID field that references the Division model", () => {
    expect(Votes.schema.path("divisionID")).to.have.property(
      "options.ref",
      "Division"
    );
  });
});

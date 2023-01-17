const mongoose = require("mongoose");
const { expect } = require("chai");
const Division = require("../models/division").Division;

describe("Division Model", () => {
  before(() => {
    // Connect to the test database
    mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
  });

  after(() => {
    // Disconnect from the test database
    mongoose.disconnect();
  });

  beforeEach(() => {
    // Clear the collection before each test
    return Division.deleteMany({});
  });

  it("should require a name", () => {
    const division = new Division({});
    return division.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it("should require a unique name", () => {
    const division1 = new Division({ name: "Badulla" });
    const division2 = new Division({ name: "Badulla" });

    return Promise.all([division1.save(), division2.save()]).catch((err) => {
      expect(err.code).to.equal(11000);
    });
  });

  it("should only accept certain values for the name field", () => {
    const division = new Division({ name: "Invalid" });
    return division.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it("should require a regVoteCount", () => {
    const division = new Division({ name: "Badulla" });
    return division.validate((err) => {
      expect(err.errors.regVoteCount).to.exist;
    });
  });

  it("should have a default value of 0 for currentVoteCount", () => {
    const division = new Division({ name: "Badulla", regVoteCount: 1000 });
    return division.save().then((doc) => {
      expect(doc.currentVoteCount).to.equal(0);
    });
  });

  it("should require a districtID", () => {
    const division = new Division({ name: "Badulla", regVoteCount: 1000 });
    return division.validate((err) => {
      expect(err.errors.districtID).to.exist;
    });
  });
});

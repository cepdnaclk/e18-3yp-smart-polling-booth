const mongoose = require("mongoose");
const { Province } = require("../models/province");
const { expect } = require("chai");

describe("Province Model", () => {
  it("should create a new Province", () => {
    const province = new Province({
      name: "Uva",
      regVoteCount: 100,
    });

    expect(province).to.be.an.instanceof(Province);
    expect(province).to.have.property("name", "Uva");
    expect(province).to.have.property("regVoteCount", 100);
    expect(province).to.have.property("currentVoteCount", 0);
  });

  it("should not create a new Province without a name", () => {
    const province = new Province({
      regVoteCount: 100,
    });

    expect(province.validate).to.throw();
  });

  it("should not create a new Province with an invalid name", () => {
    const province = new Province({
      name: "Invalid Province",
      regVoteCount: 100,
    });

    expect(province.validate).to.throw();
  });

  it("should not create a new Province without regVoteCount", () => {
    const province = new Province({
      name: "Uva",
    });

    expect(province.validate).to.throw();
  });
});

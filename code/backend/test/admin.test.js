

const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const Admin = require('../models/admin');

describe("Admin Model", () => {
  it("should have a username field of type String and required", (done) => {
    const username = Admin.schema.path("username");
    expect(username.instance).to.equal("String");
    expect(username.isRequired).to.be.true;
    done();
  });
  

  it("should have an email field of type String and required", (done) => {
    const email = Admin.schema.path("email");
    expect(email.instance).to.equal("String");
    expect(email.isRequired).to.be.true;
    done();
  });

  it("should have a password field of type String and required", (done) => {
    const password = Admin.schema.path("password");
    expect(password.instance).to.equal("String");
    expect(password.isRequired).to.be.true;
    done();
  });

  it("should have a name field of type String, required and with min and max length", (done) => {
    const name = Admin.schema.path("name");
    expect(name.instance).to.equal("String");
    expect(name.isRequired).to.be.true;
    expect(name.options.minlength).to.equal(4);
    expect(name.options.maxlength).to.equal(255);
    done();
  });

  it("should have a contactNumber field of type Number, required, with length and unique", (done) => {
    const contactNumber = Admin.schema.path("contactNumber");
    expect(contactNumber.instance).to.equal("Number");
    expect(contactNumber.isRequired).to.be.true;
    expect(contactNumber.options.length).to.equal(10);
    expect(contactNumber.options.unique).to.be.true;
    done();
  });
});


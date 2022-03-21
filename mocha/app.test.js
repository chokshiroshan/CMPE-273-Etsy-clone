var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://100.26.104.195:3001");

//Unit Test begin
describe("MochaTest", function () {
  it("should login", function (done) {
    server
      .post("/login")
      .send({
        username: "roshan",
        password: "roshan",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  it("Should register", function (done) {
    server
      .post("/register")
      .send({
        username: "Chipotle",
        email: "chipotle@gmail.com",
        password: "chipotle",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  it("Should get user data", function (done) {
    server
      .get("/getuserdata")
      .send({
        user: "roshan",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  it("Should delete item", function (done) {
    server
      .delete("/deleteitem")
      .query({ id: "37" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
  it("Should get cart total", function (done) {
    server
      .get("/getcarttotal")
      .query({ user: "roshan" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});

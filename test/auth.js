//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index");
let should = chai.should();
const User = require("../src/models/User");

chai.use(chaiHttp);
//Our parent block
describe("Auth", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    // User.deleteMany({}, (err) => {
    //   done();
    // });
    done();
  });
  describe("Auth API", () => {
    it("Create Super Admin", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          const data = JSON.parse(res.text);
          console.log("data: " + data.success, "message: " + data.message);
          done();
        });
    });
    it("POST /auth/signin", (done) => {
      chai
        .request(server)
        .post("/auth/signin")
        .send({
          email: "admin@admin.com",
          password: "admin@admin.com",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          const data = JSON.parse(res.text);
          console.log("data: " + data.success, "message: " + data.message);
          done();
        });
    });
    it("POST SignIn with wrong email or password", (done) => {
      chai
        .request(server)
        .post("/auth/signin")
        .send({
          email: "admin@admin.com1",
          password: "admin@admin.com1",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          const data = JSON.parse(res.text);
          console.log("data: " + data.success, "message: " + data.message);
          done();
        });
    });
    it("POST /auth/login", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          email: "admin@admin.com",
          password: "admin@admin.com",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          const data = JSON.parse(res.text);
          console.log("data: " + data.success, "message: " + data.message);
          done();
        });
    });
  });
});

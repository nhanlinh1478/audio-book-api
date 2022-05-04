//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index");
let should = chai.should();
let token = "";
const Book = require("../src/models/Book");

chai.use(chaiHttp);
//Our parent block
describe("Category", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Book.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/Category API", () => {
    it("POST /category", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          email: "admin@admin.com",
          password: "admin@admin.com",
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          token = data.data.jwt;
          chai
            .request(server)
            .post("/categories")
            .send({
              name: "Unit test",
              description: "Unit test",
            })
            .set("Authorization", "Bearer " + token)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a("object");
              const data = JSON.parse(response.text);
              console.log("data: " + data.success, "message: " + data.message);
              done();
            });
        });
    });
    it("GET /category", (done) => {
      chai
        .request(server)
        .get("/categories")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          const data = JSON.parse(res.text);
          console.log("data: " + data.success, "message: " + data.message);
          done();
        });
    });
    it("GET /category/:categoryId", (done) => {
      chai
        .request(server)
        .get("/categories")
        .end((err, res) => {
          const data = JSON.parse(res.text);
          chai
            .request(server)
            .get(`/categories/${data.data[0]._id}`)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a("object");
              const data = JSON.parse(response.text);
              console.log("data: " + data.success, "message: " + data.message);
              done();
            });
        });
    });
    it("PUT /category/:categoryId", (done) => {
      chai
        .request(server)
        .get("/categories")
        .end((err, res) => {
          const data = JSON.parse(res.text);
          chai
            .request(server)
            .put(`/categories/${data.data[0]._id}`)
            .send({
              name: "Unit test",
              description: "Unit test",
            })
            .set("Authorization", "Bearer " + token)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a("object");
              const data = JSON.parse(response.text);
              console.log("data: " + data.success, "message: " + data.message);
              done();
            });
        });
    });
    it("DELETE /category/:categoryId", (done) => {
      chai
        .request(server)
        .get("/categories")
        .end((err, res) => {
          const data = JSON.parse(res.text);
          chai
            .request(server)
            .delete(`/categories/${data.data[0]._id}`)
            .set("Authorization", "Bearer " + token)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a("object");
              const data = JSON.parse(response.text);
              console.log("data: " + data.success, "message: " + data.message);
              done();
            });
        });
    });
  });
});

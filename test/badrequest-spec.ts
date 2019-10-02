// External Module Load
// import BadRequest from "../src/routes/endpoints/badRequest";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import express = require("express");
import * as supertest from "supertest";
import router from "../src/routes/index";

// Express
const app: express.Application = express();
app.use(router);

// Chai
const expect = chai.expect;
// let should = chai.should();
chai.use(chaiHttp);

describe("BadRequest test", () => {
  it("Display an error for all path not specified", done => {
    supertest(app)
      .get("/dfezfezfezfezdza")
      .then(value => {
        expect(value.body).to.be.a("object");
        const response = expect(value.body);
        process.stdout.write(`${JSON.stringify(response, null, " ")}`);
        done();
      })
      .catch(err => {
        process.stdout.write(`${JSON.stringify(err, null, " ")}`);
      });
  });
});

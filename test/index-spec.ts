import * as chai from "chai";
import index = require("../src/example/index");

const expect = chai.expect;
describe("index - Greeter", () => {
  it("should provide Greeter", () => {
    if (expect(index.Greeter).to.not.be.undefined) {
      return true;
    }
    return false;
  });
});

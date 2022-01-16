import * as chai from "chai";
import { Greeter } from "../src/example/greeter";

const expect = chai.expect;

describe("Greeter", () => {
  it("should greet with message", () => {
    const greeter = new Greeter("friend");
    if (expect(greeter.greet()).to.equal("Bonjour, friend!")) {
      return true;
    }
    return false;
  });
});

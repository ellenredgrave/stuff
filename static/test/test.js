const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;
const chai = window.chai;
const expect = chai.expect;

const arbDropList = fc.list;

import Dropdown from "../main.js";
//import assert from "chai";

describe("Mocha", function () {
    it("Correctly initialises Mocha", function () {
    });

    it("Correctly initialises FastCheck", function () {
        fc.assert(fc.property(fc.integer(), () => true));
    });

});
describe("Mocha", function () {
    it("Correctly check easyToTest returns 'called'", function () {
        /* expect(easyToTest()).to.strictEqual("called"); */
        let test_easy = Dropdown.test();
        if (test_easy !== "called") {
            throw "test failed";
        }
    });
    it("Given a list of town names and ids" +
    "populate the town dropdown", function () {
        let dropdown_populate = Dropdown.dropdownOptions();

    }
    
    
    )
});
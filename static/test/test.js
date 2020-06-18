import Dropdown from "../main.js";


const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;
const chai = window.chai;
const expect = chai.expect;


describe("Mocha", function () {
    it("Correctly initialises Mocha", function () {
    });
});

describe("Mocha", function () {
    it("Correctly initialises test environment.", function () {
        fc.assert(fc.property(
            fc.integer(),
            () => true
        ));
    });
});


describe("Main", function () {
    it("Given a dropdown, " +
    "when the getAndClearDropdown function is called, " +
    "clear the dropdown.",
     function () {
            /* expect(easyToTest()).to.strictEqual("called"); */
            Dropdown.getAndClearDropdown("#where");
            if ($("#where option").length !=1 ) {
                throw "test failed";
            }
        });
    it("Given a dropdown, " +
        "when the dropdownOptions function is called, " +
        "add the correct number of options to the dropdown",
         function () {
            let dd = Dropdown.getAndClearDropdown("#where");
            Dropdown.dropdownOptions({'town_id':'t1', 'town_name':'T1'}, dd)
            Dropdown.dropdownOptions({'town_id':'t2', 'town_name':'T2'}, dd)
            Dropdown.dropdownOptions({'town_id':'t3', 'town_name':'T3'}, dd)
            Dropdown.dropdownOptions({'town_id':'t4', 'town_name':'T4'}, dd)
            Dropdown.dropdownOptions({'town_id':'t5', 'town_name':'T5'}, dd)
            if ($("#where option").length !==6 ) {
                throw "test failed";
            }
        });
        it("Given a dropdown, " +
        "when the dropdownOptions function is called, " +
        "add the correct number of options to the dropdown " +
        "with a random number of dropdown options",
         function () {
            fc.assert(
                fc.property(
                    fc.integer(1, 10),
                    function (arbNum) {
                        let dd = Dropdown.getAndClearDropdown("#where");
                        var i;
                        for (i = 0; i < arbNum; i++)  {
                            Dropdown.dropdownOptions({'town_id':'t5', 'town_name':'T5'}, dd)
                        }
                        if ($("#where option").length !== (arbNum + 1) ) {
                            throw "test failed";
                        }
                    }));
                });
            });

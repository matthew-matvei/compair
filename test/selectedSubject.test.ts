import { expect } from "chai";

import { setSelectedSubject } from "actions/subjects";
import { ISubject } from "models";
import selectedSubjectReducers from "reducers/selectedSubject";

describe("SelectedSubject reducers", () => {

    let testSelectedSubject: ISubject;

    beforeEach(() => {
        testSelectedSubject = {
            name: "Cities",
            criteria: []
        };
    });

    describe("set", () => {

        it("the selected subject when given subject is different", () => {
            const result = selectedSubjectReducers(testSelectedSubject,
                setSelectedSubject("People"));

            expect(result.name).to.equal("People");
        });
    });
});

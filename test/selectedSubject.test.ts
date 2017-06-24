import { expect } from "chai";

import { ISubject } from "models";
import { setSelectedSubject } from "actions/subjects";
import selectedSubjectReducers from "reducers/selectedSubject";

describe("SelectedSubject reducers", () => {

    let testSelectedSubject: ISubject;

    beforeEach(() => {
        testSelectedSubject = {
            name: "Cities",
            criteria: [],
            instances: []
        };
    });

    describe("set", () => {

        it("the selected subject when given subject is different", () => {
            const result = selectedSubjectReducers(testSelectedSubject,
                setSelectedSubject({
                    name: "People",
                    criteria: [],
                    instances: []
                }));

            expect(result.name).to.equal("People");
        });
    });
});

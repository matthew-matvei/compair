import { expect } from "chai";

import { setSelectedSubjectName } from "actions/subjects";
import selectedSubjectReducers from "reducers/selectedSubjectName";

describe("SelectedSubject reducers", () => {

    let testSelectedSubjectName: string;

    beforeEach(() => {
        testSelectedSubjectName = "Cities";
    });

    describe("set", () => {

        it("the selected subject when given subject is different", () => {
            const result = selectedSubjectReducers(testSelectedSubjectName,
                setSelectedSubjectName("People"));

            expect(result).to.equal("People");
        });
    });
});

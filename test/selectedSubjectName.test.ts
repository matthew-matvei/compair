import { expect } from "chai";

import { setSelectedSubject } from "actions/subjects";
import selectedSubjectNameReducers from "reducers/selectedSubjectName";

describe("SelectedSubject reducers", () => {

    let testSelectedSubjectName: string;

    beforeEach(() => {
        testSelectedSubjectName = "Cities";
    });

    describe("set", () => {

        it("the selected subject when given subject is different", () => {
            const result = selectedSubjectNameReducers(testSelectedSubjectName,
                setSelectedSubject("People"));

            expect(result).to.equal("People");
        });
    });
});

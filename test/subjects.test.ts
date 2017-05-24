import { expect } from "chai";

import { addSubject } from "actions/subjects";
import { ISubject } from "models";
import subjectReducer from "reducers/subjects";

describe("Subject reducers", () => {

    let testSubjects: ISubject[];
    let testSubjectToAdd: ISubject;

    beforeEach(() => {
        testSubjects = new Array<ISubject>();
        testSubjectToAdd = { name: "Test Subject" };
    });

    it("can add a subject to an empty list", () => {
        const result = subjectReducer(testSubjects,
            addSubject(testSubjectToAdd.name));

        expect(result.some(subject => subject.name === testSubjectToAdd.name))
            .to.be.true;
        expect(result.length).to.equal(1);
    });

    it("can add a subject to a list of one", () => {
        testSubjects.push({ name: "Test Subject 2" });

        const result = subjectReducer(testSubjects,
            addSubject(testSubjectToAdd.name));

        expect(result.some(subject => subject.name === testSubjectToAdd.name))
            .to.be.true;
        expect(result.length).to.equal(2);
    });

    it("can add a subject to a list of two", () => {
        testSubjects.push({ name: "Test Subject 2" });
        testSubjects.push({ name: "Test Subject 3" });

        const result = subjectReducer(testSubjects,
            addSubject(testSubjectToAdd.name));

        expect(result.some(subject => subject.name === testSubjectToAdd.name))
            .to.be.true;
        expect(result.length).to.equal(3);
    });

    it("prepends the new subject to the start of the list", () => {
        testSubjects.push({ name: "Test Subject 2" });
        testSubjects.push({ name: "Test Subject 3" });

        const result = subjectReducer(testSubjects,
            addSubject(testSubjectToAdd.name))[0];

        expect(result.name === testSubjectToAdd.name);
    });
});

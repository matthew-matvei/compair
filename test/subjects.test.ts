import { expect } from "chai";

import { addSubject, deleteSubject } from "actions/subjects";
import { IKeyValue, ISubject } from "models";
import subjectReducer from "reducers/subjects";

describe("Subject reducers", () => {

    let testSubjects: ISubject[];
    let testSubjectToAdd: ISubject;
    let testSubject2: ISubject;
    let testSubject3: ISubject;

    before(() => {
        testSubject2 = {
            name: "Test Subject 2",
            values: [<IKeyValue>{ key: "2", value: 2 }]
        };

        testSubject3 = {
            name: "Test Subject 3",
            values: [<IKeyValue>{ key: "3", value: 3 }]
        };
    });

    beforeEach(() => {
        testSubjects = new Array<ISubject>();
        testSubjectToAdd = {
            name: "Test Subject",
            values: [<IKeyValue>{ key: "1", value: 1 }]
        };
    });

    describe("adds", () => {
        it("a subject to an empty list", () => {
            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name));

            expect(result.some(
                subject => subject.name === testSubjectToAdd.name)).to.be.true;
            expect(result.length).to.equal(1);
        });

        it("a subject to a list of one", () => {
            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name));

            expect(result.some(
                subject => subject.name === testSubjectToAdd.name)).to.be.true;
            expect(result.length).to.equal(2);
        });

        it("a subject to a list of two", () => {
            testSubjects.push(testSubject2);
            testSubjects.push(testSubject3);

            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name));

            expect(result.some(
                subject => subject.name === testSubjectToAdd.name)).to.be.true;
            expect(result.length).to.equal(3);
        });

        it("the new subject to the start of the list", () => {
            testSubjects.push(testSubject2);
            testSubjects.push(testSubject3);

            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name))[0];

            expect(result.name === testSubjectToAdd.name);
        });

        it("a subject as long as it doesn't already exist", () => {
            testSubjects.push({
                name: testSubjectToAdd.name,
                values: [{ key: "10", value: 10 }]
            });

            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name));

            expect(result.length).to.equal(1);
        });
    });

    describe("deletes", () => {

        it("a subject identified by name", () => {
            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                deleteSubject(testSubject2.name));

            expect(result).to.be.empty;
        });

        it("nothing when subject doesn't exist", () => {
            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                deleteSubject("Different subject"));

            expect(result.length).to.equal(1);
            expect(result.some((subject) => subject.name === testSubject2.name))
                .to.be.true;
        });
    });
});

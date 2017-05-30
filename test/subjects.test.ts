import { expect } from "chai";

import { addSubject, deleteSubject, renameSubject } from "actions/subjects";
import { ISubject } from "models";
import subjectReducer from "reducers/subjects";

describe("Subject reducers", () => {

    let testSubjects: ISubject[];
    let testSubjectToAdd: ISubject;
    let testSubject2: ISubject;
    let testSubject3: ISubject;

    before(() => {
        testSubject2 = {
            name: "Test Subject 2",
            criteria: [{ key: "2", order: "asc", priority: 2 }],
            instances: [
                {
                    name: "Test instance 2",
                    values: [{ key: "2", value: 2 }]
                }]
        };

        testSubject3 = {
            name: "Test Subject 3",
            criteria: [{ key: "3", order: "asc", priority: 3 }],
            instances: [
                {
                    name: "Test instance 3",
                    values: [{ key: "3", value: 3 }]
                }
            ]
        };
    });

    beforeEach(() => {
        testSubjects = new Array<ISubject>();
        testSubjectToAdd = {
            name: "Test Subject",
            criteria: [{ key: "1", order: "asc", priority: 1 }],
            instances: [
                {
                    name: "Test instance to add",
                    values: [{ key: "1", value: 1 }]
                }
            ]
        };
    });

    describe("add", () => {
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
            testSubjects.push(testSubject2, testSubject3);

            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name))[0];

            expect(result.name === testSubjectToAdd.name);
        });

        it("a subject as long as it doesn't already exist", () => {
            testSubjects.push({
                name: testSubjectToAdd.name,
                criteria: [],
                instances: []
            });

            const result = subjectReducer(testSubjects,
                addSubject(testSubjectToAdd.name));

            expect(result.length).to.equal(1);
        });
    });

    describe("delete", () => {

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

    describe("rename", () => {

        it("a subject identified by oldName", () => {
            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                renameSubject(testSubject2.name, "New subject"));

            expect(result.some((subject) => subject.name === "New subject"))
                .to.be.true;
        });

        it("nothing when subject doesn't exist", () => {
            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                renameSubject(testSubject3.name, "New subject"));

            expect(result.some((subject) => subject.name === "New subject"))
                .to.be.false;
        });
    });
});

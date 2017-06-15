import { expect } from "chai";

import { addCriterion, deleteCriterion } from "actions/criteria";
import { addInstance, deleteInstance } from "actions/instances";
import { createSubject, deleteSubject, renameSubject } from "actions/subjects";
import { ICriterion, IInstance, ISubject } from "models";
import subjectReducer from "reducers/subjects";

describe("Subject reducers", () => {

    let testSubjects: ISubject[];
    let testSubjectToAdd: ISubject;
    let testSubject2: ISubject;
    let testSubject3: ISubject;

    let testCriterionToAdd: ICriterion;
    let testCriterion2: ICriterion;
    let testCriterion3: ICriterion;

    let testInstanceToAdd: IInstance;
    let testInstance2: IInstance;
    let testInstance3: IInstance;

    before(() => {
        testSubject2 = {
            name: "Test Subject 2",
            criteria: [],
            instances: []
        };

        testSubject3 = {
            name: "Test Subject 3",
            criteria: [],
            instances: []
        };

        testCriterion2 = { key: "2", order: "asc", priority: 2 };
        testCriterion3 = { key: "3", order: "asc", priority: 3 };

        testInstance2 = { name: "Test Instance 2", values: [] };
        testInstance3 = { name: "Test Instance 3", values: [] };
    });

    beforeEach(() => {
        testSubjectToAdd = {
            name: "Test Subject",
            criteria: [],
            instances: []
        };
        testCriterionToAdd = { key: "1", order: "asc", priority: 1 };
        testInstanceToAdd = { name: "Test Instance 1", values: [] };
        testSubjects = [testSubjectToAdd];
    });

    describe("add", () => {

        it("a criteria to an empty list", () => {
            const result = subjectReducer(testSubjects, addCriterion(
                testSubjectToAdd, testCriterionToAdd));

            expect(result.some(
                subject => subject.criteria.length === 1 &&
                    subject.criteria.some(criterion =>
                        criterion.key === testCriterionToAdd.key))).to.be.true;
        });

        it("a criteria to a list of one", () => {
            testSubjectToAdd.criteria.push(testCriterion2);
            const result = subjectReducer(testSubjects, addCriterion(
                testSubjectToAdd, testCriterionToAdd));

            expect(result.some(
                subject => subject.criteria.length === 2 &&
                    subject.criteria.some(criterion =>
                        criterion.key === testCriterionToAdd.key))).to.be.true;
        });

        it("a criteria to a list of two", () => {
            testSubjectToAdd.criteria.push(testCriterion2, testCriterion3);
            const result = subjectReducer(testSubjects, addCriterion(
                testSubjectToAdd, testCriterionToAdd));

            expect(result.some(
                subject => subject.criteria.length === 3 &&
                    subject.criteria.some(criterion =>
                        criterion.key === testCriterionToAdd.key))).to.be.true;
        });

        it("nothing if criteria already exists", () => {
            testSubjectToAdd.criteria.push(testCriterionToAdd);
            const result = subjectReducer(testSubjects, addCriterion(
                testSubjectToAdd, testCriterionToAdd));

            expect(result.some(
                subject => subject.criteria.length === 1)).to.be.true;
        });

        it("an instance to an empty list", () => {
            const result = subjectReducer(testSubjects, addInstance(
                testSubjectToAdd, testInstanceToAdd));

            expect(result.some(
                subject => subject.instances.length === 1 &&
                    subject.instances.some(instance =>
                        instance.name === testInstanceToAdd.name))).to.be.true;
        });

        it("an instance to a list of one", () => {
            testSubjectToAdd.instances.push(testInstance2);
            const result = subjectReducer(testSubjects, addInstance(
                testSubjectToAdd, testInstanceToAdd));

            expect(result.some(
                subject => subject.instances.length === 2 &&
                    subject.instances.some(instance =>
                        instance.name === testInstanceToAdd.name))).to.be.true;
        });

        it("an instance to a list of two", () => {
            testSubjectToAdd.instances.push(testInstance2, testInstance3);
            const result = subjectReducer(testSubjects, addInstance(
                testSubjectToAdd, testInstanceToAdd));

            expect(result.some(
                subject => subject.instances.length === 3 &&
                    subject.instances.some(instance =>
                        instance.name === testInstanceToAdd.name))).to.be.true;
        });

        it("nothing if instance already exists", () => {
            testSubjectToAdd.instances.push(testInstanceToAdd);
            const result = subjectReducer(testSubjects, addInstance(
                testSubjectToAdd, testInstanceToAdd));

            expect(result.some(
                subject => subject.instances.length === 1)).to.be.true;
        });

        describe("a subject", () => {

            beforeEach(() => {
                // remove previously inserted subject needed for most tests
                testSubjects.pop();
            });

            it("to an empty list", () => {
                const result = subjectReducer(testSubjects,
                    createSubject(testSubjectToAdd.name));

                expect(result.some(
                    subject => subject.name === testSubjectToAdd.name))
                    .to.be.true;
                expect(result.length).to.equal(1);
            });

            it("to a list of one", () => {
                testSubjects.push(testSubject2);

                const result = subjectReducer(testSubjects,
                    createSubject(testSubjectToAdd.name));

                expect(result.some(
                    subject => subject.name === testSubjectToAdd.name))
                    .to.be.true;
                expect(result.length).to.equal(2);
            });

            it("to a list of two", () => {
                testSubjects.push(testSubject2);
                testSubjects.push(testSubject3);

                const result = subjectReducer(testSubjects,
                    createSubject(testSubjectToAdd.name));

                expect(result.some(
                    subject => subject.name === testSubjectToAdd.name))
                    .to.be.true;
                expect(result.length).to.equal(3);
            });

            it("to the start of the list", () => {
                testSubjects.push(testSubject2, testSubject3);

                const result = subjectReducer(testSubjects,
                    createSubject(testSubjectToAdd.name))[0];

                expect(result.name === testSubjectToAdd.name);
            });

            it("as long as it doesn't already exist", () => {
                testSubjects.push({
                    name: testSubjectToAdd.name,
                    criteria: [],
                    instances: []
                });

                const result = subjectReducer(testSubjects,
                    createSubject(testSubjectToAdd.name));

                expect(result.length).to.equal(1);
            });
        });
    });

    describe("delete", () => {

        it("a criterion identified by name", () => {
            testSubjectToAdd.criteria.push(testCriterionToAdd);
            const result = subjectReducer(testSubjects, deleteCriterion(
                testSubjectToAdd, testCriterionToAdd.key));

            expect(result.some(
                subject => subject.criteria.length === 0)).to.be.true;
        });

        it("nothing when criteron doesn't exist", () => {
            testSubjectToAdd.criteria.push(testCriterion2);
            const result = subjectReducer(testSubjects, deleteCriterion(
                testSubjectToAdd, testCriterionToAdd.key));

            expect(result.some(
                subject => subject.criteria.length === 1 &&
                    subject.criteria.some(criterion =>
                        criterion.key === testCriterion2.key))).to.be.true;
        });

        it("an instance identified by name", () => {
            testSubjectToAdd.instances.push(testInstanceToAdd);
            const result = subjectReducer(testSubjects, deleteInstance(
                testSubjectToAdd, testInstanceToAdd.name));

            expect(result.some(
                subject => subject.instances.length === 0)).to.be.true;
        });

        it("nothing when instance doesn't exist", () => {
            testSubjectToAdd.instances.push(testInstance2);
            const result = subjectReducer(testSubjects, deleteInstance(
                testSubjectToAdd, testInstanceToAdd.name));

            expect(result.some(
                subject => subject.instances.length === 1 &&
                    subject.instances.some(instance =>
                        instance.name === testInstance2.name))).to.be.true;
        });

        it("a subject identified by name", () => {
            // delete generally needed subject
            testSubjects.pop();

            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                deleteSubject(testSubject2.name));

            expect(result).to.be.empty;
        });

        it("nothing when subject doesn't exist", () => {
            // delete generally needed subject
            testSubjects.pop();

            testSubjects.push(testSubject2);

            const result = subjectReducer(testSubjects,
                deleteSubject(testSubjectToAdd.name));

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

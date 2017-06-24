import { expect } from "chai";

import { isMissingKeyValue, orderInstances } from "helpers";
import { ICriterion, IInstance, IKeyValue } from "models";

describe("Helper function", () => {

    let testCriterion1: ICriterion;
    let testCriterion2: ICriterion;
    let testCriterion3: ICriterion;
    let testCriterion4: ICriterion;

    let testKeyValue1: IKeyValue;
    let testKeyValue2: IKeyValue;
    let testKeyValue3: IKeyValue;
    let testKeyValue4: IKeyValue;

    before(() => {
        testCriterion1 = {
            key: "Test Criterion 1",
            order: "desc",
            priority: 1
        };

        testCriterion2 = {
            key: "Test Criterion 2",
            order: "desc",
            priority: 5
        };

        testCriterion3 = {
            key: "Test Criterion 3",
            order: "asc",
            priority: 3
        };

        testCriterion4 = {
            key: "Test Criterion 4",
            order: "asc",
            priority: 5
        };

        testKeyValue1 = { key: "Test Criterion 1", value: 10000 };
        testKeyValue2 = { key: "Test Criterion 2", value: 100 };
        testKeyValue3 = { key: "Test Criterion 3", value: 10 };
        testKeyValue4 = { key: "Test Criterion 4", value: 1 };
    });

    describe("orderInstances", () => {

        let testCriteria: ICriterion[];
        let testInstances: IInstance[];

        /**
         * The instance that should be first in the ordered list.
         */
        let testInstance1: IInstance;

        /**
         * The instance that should be second in the ordered list.
         */
        let testInstance2: IInstance;

        /**
         * The instance that should be third in the ordered list.
         */
        let testInstance3: IInstance;

        /**
         * An instance missing some criteria.
         */
        let testInstanceEmpty: IInstance;

        before(() => {
            testCriteria = [
                testCriterion1,
                testCriterion2,
                testCriterion3,
                testCriterion4
            ];

            testInstance1 = {
                name: "Test Instance 1",
                values: [
                    testKeyValue1,
                    testKeyValue2,
                    testKeyValue3,
                    testKeyValue4
                ]
            };

            testInstance2 = {
                name: "Test Instance 2",
                values: [
                    { key: "Test Criterion 1", value: 80000 },
                    { key: "Test Criterion 2", value: 80 },
                    { key: "Test Criterion 3", value: 12 },
                    { key: "Test Criterion 4", value: 1.2 }
                ]
            };

            testInstance3 = {
                name: "Test Instance 3",
                values: [
                    { key: "Test Criterion 1", value: 60000 },
                    { key: "Test Criterion 2", value: 60 },
                    { key: "Test Criterion 3", value: 14 },
                    { key: "Test Criterion 4", value: 1.4 }
                ]
            };

            testInstanceEmpty = {
                name: "Test Instance Missing Criteria",
                values: [
                    { key: "Test Criterion 1", value: 10000 }
                ]
            };
        });

        beforeEach(() => {
            testInstances = new Array<IInstance>();
        });

        it("returns an empty list when given one", () => {
            const result = orderInstances(testCriteria, testInstances);

            expect(result).to.be.empty;
        });

        it("returns a list of one instance when given one", () => {
            testInstances.push(testInstance1);
            const result = orderInstances(testCriteria, testInstances);

            expect(result).to.deep.equal([testInstance1]);
        });

        it("returns an ordered list of two instances", () => {
            testInstances.push(testInstance2, testInstance1);
            const result = orderInstances(testCriteria, testInstances);

            expect(result).to.deep.equal([testInstance1, testInstance2]);
        });

        it("returns an ordered list of three instances", () => {
            testInstances.push(testInstance3, testInstance2, testInstance1);
            const result = orderInstances(testCriteria, testInstances);

            expect(result).to.deep.equal(
                [testInstance1, testInstance2, testInstance3]);
        });

        it("handles a list including an instance with missing criteria", () => {
            testInstances.push(testInstanceEmpty);
            const result = orderInstances(testCriteria, testInstances);

            expect(result).to.deep.equal([testInstanceEmpty]);
        });
    });

    describe("isMissingKeyValue function", () => {

        let testCriteria: ICriterion[];
        let testKeyValues: IKeyValue[];

        beforeEach(() => {
            testCriteria = new Array<ICriterion>();
            testKeyValues = new Array<IKeyValue>();
        });

        it("returns false when both lists are empty", () => {
            const result = isMissingKeyValue(testCriteria, testKeyValues);

            expect(result).to.be.false;
        });

        it("returns true when lists are of different lengths", () => {
            testCriteria.push(testCriterion1);
            const result = isMissingKeyValue(testCriteria, testKeyValues);

            expect(result).to.be.true;
        });

        it("returns true when criterion not in keyValues exists", () => {
            testCriteria.push(testCriterion1);
            testKeyValues.push(testKeyValue2);
            const result = isMissingKeyValue(testCriteria, testKeyValues);

            expect(result).to.be.true;
        });

        it("returns true when criterion not in keyValues exists (2)", () => {
            testCriteria.push(testCriterion1, testCriterion2);
            testKeyValues.push(testKeyValue1, testKeyValue3);
            const result = isMissingKeyValue(testCriteria, testKeyValues);

            expect(result).to.be.true;
        });

        it("returns false when all criteria have keyValues", () => {
            testCriteria.push(testCriterion1);
            testKeyValues.push(testKeyValue1);
            const result = isMissingKeyValue(testCriteria, testKeyValues);

            expect(result).to.be.false;
        });

        it("returns false when all criteria have keyValues (2)", () => {
            testCriteria.push(testCriterion1, testCriterion2);
            testKeyValues.push(testKeyValue1, testKeyValue2);
            const result = isMissingKeyValue(testCriteria, testKeyValues);

            expect(result).to.be.false;
        });
    });
});

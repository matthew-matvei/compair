import { expect } from "chai";

import { orderInstances } from "helpers";
import { ICriterion, IInstance } from "models";

describe("Helper function", () => {

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
            testCriteria = [{
                key: "Test Criterion 1",
                order: "asc",
                priority: 1
            },
            {
                key: "Test Criterion 2",
                order: "asc",
                priority: 5
            },
            {
                key: "Test Criterion 3",
                order: "desc",
                priority: 3
            },
            {
                key: "Test Criterion 4",
                order: "desc",
                priority: 5
            }];

            testInstance1 = {
                name: "Test Instance 1",
                values: [
                    { key: "Test Criterion 1", value: 10000 },
                    { key: "Test Criterion 2", value: 100 },
                    { key: "Test Criterion 3", value: 10 },
                    { key: "Test Criterion 4", value: 1 }
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
});

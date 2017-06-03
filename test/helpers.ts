import { expect } from "chai";

import { orderInstances } from "helpers";
import { ICriterion, IInstance } from "models";

describe("Helper function", () => {

    describe("orderInstances", () => {

        let testCriteria: ICriterion[];
        let testInstances: IInstance[];
        let testInstance1: IInstance;
        let testInstance2: IInstance;
        let testInstance3: IInstance;

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

            /*
             * Values in testInstance1 are engineered so that it will be 1st
             * in the ordered output.
             */
            testInstance1 = {
                name: "Test Instance 1",
                values: [
                    { key: "Test Criterion 1", value: 10000 },
                    { key: "Test Criterion 2", value: 100 },
                    { key: "Test Criterion 3", value: 10 },
                    { key: "Test Criterion 4", value: 1 }
                ]
            };

            /*
            * Values in testInstance2 are engineered so that it will be 2nd
            * in the ordered output.
            */
            testInstance2 = {
                name: "Test Instance 2",
                values: [
                    { key: "Test Criterion 1", value: 80000 },
                    { key: "Test Criterion 2", value: 80 },
                    { key: "Test Criterion 3", value: 12 },
                    { key: "Test Criterion 4", value: 1.2 }
                ]
            };

            /*
            * Values in testInstance3 are engineered so that it will be 3rd
            * in the ordered output.
            */
            testInstance3 = {
                name: "Test Instance 3",
                values: [
                    { key: "Test Criterion 1", value: 60000 },
                    { key: "Test Criterion 2", value: 60 },
                    { key: "Test Criterion 3", value: 14 },
                    { key: "Test Criterion 4", value: 1.4 }
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
    });
});

import { expect } from "chai";

import { orderInstances } from "helpers";
import { ICriterion, IInstance } from "models";

describe("Helper function", () => {

    describe("orderInstances", () => {

        let testCriteria: ICriterion[];
        let testInstances: IInstance[];
        let testInstance1: IInstance;

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
                values: [{ key: "Test Criterion 1", value: 10 }]
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
    });
});

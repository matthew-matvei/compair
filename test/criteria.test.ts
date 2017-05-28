import { expect } from "chai";

import { addCriterion, deleteCriterion } from "actions/criteria";
import { ICriterion } from "models";
import criterionReducers from "reducers/criteria";

describe("Criterion reducers", () => {

    let testCriterionToAdd: ICriterion;
    let testCriterion2: ICriterion;
    let testCriterion3: ICriterion;
    let testCriteria: ICriterion[];

    before(() => {
        testCriterionToAdd = {
            key: "1",
            order: "asc",
            priority: 1
        };

        testCriterion2 = {
            key: "2",
            order: "asc",
            priority: 2
        };

        testCriterion3 = {
            key: "3",
            order: "asc",
            priority: 3
        };
    });

    beforeEach(() => {
        testCriteria = new Array<ICriterion>();
    });

    describe("add", () => {

        it("a criterion to a empty list", () => {
            const result = criterionReducers(testCriteria, addCriterion(
                testCriterionToAdd));

            expect(result.some(criterion =>
                criterion.key === testCriterionToAdd.key)).to.be.true;
            expect(result.length).to.equal(1);
        });

        it("a criterion to a list of one", () => {
            testCriteria.push(testCriterion2);

            const result = criterionReducers(testCriteria, addCriterion(
                testCriterionToAdd));

            expect(result.some(criterion =>
                criterion.key === testCriterionToAdd.key)).to.be.true;
            expect(result.length).to.equal(2);
        });

        it("a criterion to a list of two", () => {
            testCriteria.push(testCriterion2, testCriterion3);

            const result = criterionReducers(testCriteria, addCriterion(
                testCriterionToAdd));

            expect(result.some(criterion =>
                criterion.key === testCriterionToAdd.key)).to.be.true;
            expect(result.length).to.equal(3);
        });

        it("nothing if the criterion exists already", () => {
            testCriteria.push(testCriterionToAdd);

            const result = criterionReducers(testCriteria, addCriterion(
                testCriterionToAdd));

            expect(result.length).to.equal(1);
        });
    });

    describe("delete", () => {

        it("a criterion identified by key", () => {
            testCriteria.push(testCriterionToAdd);

            const result = criterionReducers(testCriteria, deleteCriterion(
                testCriterionToAdd.key
            ));

            expect(result).to.be.empty;
        });

        it("nothing if criterion doesn't exist", () => {
            testCriteria.push(testCriterion2);

            const result = criterionReducers(testCriteria, deleteCriterion(
                testCriterionToAdd.key
            ));

            expect(result.some(criterion =>
                criterion.key === testCriterion2.key)).to.be.true;
            expect(result.length).to.equal(1);
        });
    });
});

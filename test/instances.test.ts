import { expect } from "chai";

import { addInstance, deleteInstance } from "actions/instances";
import { IInstance } from "models";
import instanceReducers from "reducers/instances";

describe("Instance reducers", () => {

    let testInstanceToAdd: IInstance;
    let testInstance2: IInstance;
    let testInstance3: IInstance;
    let testInstances: IInstance[];

    before(() => {
        testInstanceToAdd = {
            name: "1",
            values: []
        };

        testInstance2 = {
            name: "2",
            values: []
        };

        testInstance3 = {
            name: "3",
            values: []
        };
    });

    beforeEach(() => {
        testInstances = new Array<IInstance>();
    });

    describe("add", () => {

        it("an instance to an empty list", () => {
            const result = instanceReducers(testInstances, addInstance(
                testInstanceToAdd.name, testInstanceToAdd.values));

            expect(result.some(instance =>
                instance.name === testInstanceToAdd.name)).to.be.true;
            expect(result.length).to.equal(1);
        });

        it("an instance to a list of one", () => {
            testInstances.push(testInstance2);

            const result = instanceReducers(testInstances, addInstance(
                testInstanceToAdd.name, testInstanceToAdd.values));

            expect(result.some(instance =>
                instance.name === testInstanceToAdd.name)).to.be.true;
            expect(result.length).to.equal(2);
        });

        it("an instance to a list of two", () => {
            testInstances.push(testInstance2, testInstance3);

            const result = instanceReducers(testInstances, addInstance(
                testInstanceToAdd.name, testInstanceToAdd.values));

            expect(result.some(instance =>
                instance.name === testInstanceToAdd.name)).to.be.true;
            expect(result.length).to.equal(3);
        });

        it("nothing if the instance exists already", () => {
            testInstances.push(testInstanceToAdd);

            const result = instanceReducers(testInstances, addInstance(
                testInstanceToAdd.name, testInstanceToAdd.values));

            expect(result.length).to.equal(1);
        });
    });

    describe("delete", () => {

        it("an instance identified by name", () => {
            testInstances.push(testInstanceToAdd);

            const result = instanceReducers(testInstances, deleteInstance(
                testInstanceToAdd.name
            ));

            expect(result).to.be.empty;
        });

        it("nothing if instance doesn't exist", () => {
            testInstances.push(testInstance2);

            const result = instanceReducers(testInstances, deleteInstance(
                testInstanceToAdd.name
            ));

            expect(result.some(instance =>
                instance.name === testInstance2.name)).to.be.true;
            expect(result.length).to.equal(1);
        });
    });
});

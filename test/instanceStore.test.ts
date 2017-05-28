import { expect } from "chai";

import {
    addToInstanceStore,
    deleteFromInstanceStore
} from "actions/instanceStore";
import { IInstanceStore, IItem } from "models";
import instanceStore from "reducers/instanceStore";

describe("InstanceStore reducers", () => {

    let testInstanceStore: IInstanceStore;
    let testItemToAdd: IItem;
    let testItem2: IItem;
    let testItem3: IItem;

    before(() => {
        testItemToAdd = {
            subjectName: "1",
            instances: []
        };

        testItem2 = {
            subjectName: "2",
            instances: []
        };

        testItem3 = {
            subjectName: "3",
            instances: []
        };
    });

    beforeEach(() => {
        testInstanceStore = {
            items: new Array<IItem>()
        };
    });

    describe("add", () => {

        it("an item to an empty list", () => {
            const result = instanceStore(testInstanceStore, addToInstanceStore(
                testItemToAdd.subjectName));

            expect(result.items.some(item =>
                item.subjectName === testItemToAdd.subjectName)).to.be.true;
            expect(result.items.length).to.equal(1);
        });

        it("an item to a list of one", () => {
            testInstanceStore.items.push(testItem2);

            const result = instanceStore(testInstanceStore, addToInstanceStore(
                testItemToAdd.subjectName));

            expect(result.items.some(item =>
                item.subjectName === testItemToAdd.subjectName)).to.be.true;
            expect(result.items.length).to.equal(2);
        });

        it("an item to a list of two", () => {
            testInstanceStore.items.push(testItem2, testItem3);

            const result = instanceStore(testInstanceStore, addToInstanceStore(
                testItemToAdd.subjectName));

            expect(result.items.some(item =>
                item.subjectName === testItemToAdd.subjectName)).to.be.true;
            expect(result.items.length).to.equal(3);
        });

        it("nothing if item already exists", () => {
            testInstanceStore.items.push(testItemToAdd);

            const result = instanceStore(testInstanceStore, addToInstanceStore(
                testItemToAdd.subjectName));

            expect(result.items.length).to.equal(1);
        });
    });

    describe("delete", () => {

        it("an item described by subject name", () => {
            testInstanceStore.items.push(testItem2);

            const result = instanceStore(testInstanceStore,
                deleteFromInstanceStore(testItem2.subjectName));

            expect(result.items.some(item =>
                item.subjectName === testItem2.subjectName)).to.be.false;
            expect(result.items).to.be.empty;
        });

        it("nothing if item doesn't exist", () => {
            testInstanceStore.items.push(testItem2);

            const result = instanceStore(testInstanceStore,
                deleteFromInstanceStore(testItemToAdd.subjectName));

            expect(result.items.some(item =>
                item.subjectName === testItem2.subjectName)).to.be.true;
            expect(result.items.length).to.equal(1);
        });
    });
});

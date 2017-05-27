import { expect } from "chai";

import { addKeyValue } from "actions/keyvalues";
import { IKeyValue } from "models";
import keyValueReducer from "reducers/keyvalues";

describe("Keyvalue reducers", () => {

    let testKeyValues: IKeyValue[];
    let testKeyValueToAdd: IKeyValue;
    let testKeyValue2: IKeyValue;
    let testKeyValue3: IKeyValue;

    before(() => {
        testKeyValue2 = {
            key: "2",
            value: 2
        };

        testKeyValue3 = {
            key: "3",
            value: 3
        };
    });

    beforeEach(() => {
        testKeyValues = new Array<IKeyValue>();
        testKeyValueToAdd = {
            key: "1",
            value: 2
        };
    });

    describe("add", () => {

        it("a key value to an empty list", () => {
            const result = keyValueReducer(testKeyValues, addKeyValue(
                testKeyValueToAdd.key, testKeyValueToAdd.value));

            expect(result.some(keyValue =>
                keyValue.key === testKeyValueToAdd.key)).to.be.true;
            expect(result.length).to.equal(1);
        });

        it("a key value to a list of one", () => {
            testKeyValues.push(testKeyValue2);
            const result = keyValueReducer(testKeyValues, addKeyValue(
                testKeyValueToAdd.key, testKeyValueToAdd.value));

            expect(result.some(keyValue =>
                keyValue.key === testKeyValueToAdd.key)).to.be.true;
            expect(result.length).to.equal(2);
        });

        it("a key value to a list of two", () => {
            testKeyValues.push(testKeyValue2);
            testKeyValues.push(testKeyValue3);
            const result = keyValueReducer(testKeyValues, addKeyValue(
                testKeyValueToAdd.key, testKeyValueToAdd.value));

            expect(result.some(keyValue =>
                keyValue.key === testKeyValueToAdd.key)).to.be.true;
            expect(result.length).to.equal(3);
        });
    });

    describe("modify", () => {

        it("the name of a key that exists", () => {
            testKeyValues.push({ key: testKeyValueToAdd.key, value: 10 });
            const result = keyValueReducer(testKeyValues, addKeyValue(
                testKeyValueToAdd.key, testKeyValueToAdd.value));

            expect(result.some(keyValue =>
                keyValue.key === testKeyValueToAdd.key &&
                keyValue.value === testKeyValueToAdd.value)).to.be.true;
            expect(result.length).to.equal(1);
        });
    });
});

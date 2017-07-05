import * as fs from "fs";
import * as path from "path";

import { subjectsFile } from "const";
import { ICriterion, IInstance, IKeyValue, ISubject } from "models";

/**
 * Orders given instances according to the given criteria.
 *
 * @param criteria - a set of criteria by which to order the
 *      instances
 * @param instances - the instances to be ordered
 * @returns - the ordered instances
 */
export function orderInstances(criteria: ICriterion[],
    instances: IInstance[], minValues: IKeyValue[], maxValues: IKeyValue[]): IInstance[] {

    return instances.sort((instanceA, instanceB): number => {
        const valueA = instanceA.values.reduce((total, keyValue) => {
            const relevantCriterion = criteria.find(
                criterion => criterion.key === keyValue.key);
            const minValue = minValues.find(
                value => value.key === keyValue.key);
            const maxValue = maxValues.find(
                value => value.key === keyValue.key);

            const thisValue = relevantCriterion ? calculateValue(
                relevantCriterion, keyValue, minValue!, maxValue!) : 0;

            return isNaN(thisValue) ? 0 + total : thisValue + total;
        }, 0);

        const valueB = instanceB.values.reduce((total, keyValue) => {
            const relevantCriterion = criteria.find(
                criterion => criterion.key === keyValue.key);
            const minValue = minValues.find(
                value => value.key === keyValue.key);
            const maxValue = maxValues.find(
                value => value.key === keyValue.key);

            const thisValue = relevantCriterion ? calculateValue(
                relevantCriterion, keyValue, minValue!, maxValue!) : 0;

            return isNaN(thisValue) ? 0 + total : thisValue + total;
        }, 0);

        return valueA - valueB;
    });
};

/**
 * Calculates the value of a matching criterion and keyValue.
 *
 * @param criterion - a criterion with a key equal to keyValue.key
 * @param keyValue - a keyValue with a key equal to criterion.key
 * @returns - the value of the keyValue according to the criterion
 */
function calculateValue(criterion: ICriterion, keyValue: IKeyValue, minValue: IKeyValue, maxValue: IKeyValue): number {
    const order = criterion.order === "asc" ? 1 : -1;

    return normaliseValue(keyValue.value, minValue.value, maxValue.value) * order * Math.log(criterion.priority);
}

function normaliseValue(value: number, minValue: number, maxValue: number): number {
    return (value - minValue) / (maxValue - minValue);
}

export function getMinValues(values: IInstance[]): IKeyValue[] {
    let minValues: {
        [key: string]: number
    } = {};

    values.forEach(instance => {
        instance.values.forEach(keyValue => {
            if (minValues[keyValue.key] === undefined ||
                keyValue.value < minValues[keyValue.key]) {
                minValues[keyValue.key] = keyValue.value;
            }
        });
    });

    return Object.keys(minValues).map(key => (<IKeyValue>{ key, value: minValues[key] }));
}

export function getMaxValues(values: IInstance[]): IKeyValue[] {
    let maxValues: {
        [key: string]: number
    } = {};

    values.forEach(instance => {
        instance.values.forEach(keyValue => {
            if (maxValues[keyValue.key] === undefined ||
                keyValue.value > maxValues[keyValue.key]) {
                maxValues[keyValue.key] = keyValue.value;
            }
        });
    });

    return Object.keys(maxValues).map(key => (<IKeyValue>{ key, value: maxValues[key] }));
}

/**
 * Returns whether an instance's keyValues that exist in criteria are missing.
 *
 * @param criteria - the criteria to check keyValues against
 * @param keyValues - the list of keyValues to check
 * @returns - true if a keyValue is missing that exists in criteria
 */
export function isMissingKeyValue(criteria: ICriterion[],
    keyValues: IKeyValue[]): boolean {

    if (criteria.length !== keyValues.length) {
        return true;
    }

    if (criteria.length > 0) {
        return !criteria.every(criterion => keyValues.find(keyValue =>
            criterion.key === keyValue.key) !== undefined);
    }

    return false;
}

/**
 * Synchronously saves given subjects at the given filepath.
 *
 * @param filepath - the directory in which to store the subjects
 * @param subjects - the subjects to store
 */
export function saveSubjects(filepath: string, subjects: ISubject[]) {
    fs.writeFileSync(path.join(filepath, subjectsFile),
        JSON.stringify(subjects.reverse()));
}

/**
 * Synchronously reads subjects from given filepath.
 *
 * @param filepath - the directory where subjects can be read
 * @returns - the subjects read from disk
 */
export function readSubjects(filepath: string): ISubject[] {
    const filename = path.join(filepath, subjectsFile);

    if (fs.existsSync(filename)) {
        return <ISubject[]>(JSON.parse(fs.readFileSync(path.join(
            filepath, subjectsFile)).toString()));
    }

    return [];
}

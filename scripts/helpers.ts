import * as fs from "fs";
import * as path from "path";

import { subjectsFile } from "const";
import { ICriterion, IInstance, IKeyValue, IMinMax, ISubject } from "models";

/**
 * Orders given instances according to the given criteria.
 *
 * @param criteria - a set of criteria by which to order the
 *      instances
 * @param instances - the instances to be ordered
 * @returns - the ordered instances
 */
export function orderInstances(criteria: ICriterion[],
    instances: IInstance[]): IInstance[] {

    const minMaxValues = getMinMaxValues(instances);

    return instances.sort((instanceA, instanceB): number => {
        const valueA = instanceA.values.reduce((total, keyValue) => {
            const relevantCriterion = criteria.find(
                criterion => criterion.key === keyValue.key);
            const minMaxValue = minMaxValues.find(
                value => value.key === keyValue.key);

            const thisValue = relevantCriterion ? calculateValue(
                relevantCriterion, keyValue, minMaxValue!) : 0;

            return isNaN(thisValue) ? 0 + total : thisValue + total;
        }, 0);

        const valueB = instanceB.values.reduce((total, keyValue) => {
            const relevantCriterion = criteria.find(
                criterion => criterion.key === keyValue.key);
            const minMaxValue = minMaxValues.find(
                value => value.key === keyValue.key);

            const thisValue = relevantCriterion ? calculateValue(
                relevantCriterion, keyValue, minMaxValue!) : 0;

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
 * @param minMaxValue - minimum and maximum values for given keyValue
 * @returns - the value of the keyValue according to the criterion
 */
function calculateValue(criterion: ICriterion, keyValue: IKeyValue, minMaxValue: IMinMax): number {
    const order = criterion.order === "asc" ? 1 : -1;

    return normaliseValue(keyValue.value, minMaxValue.min, minMaxValue.max) * order * Math.log(criterion.priority);
}

/**
 * Returns a normalised version of the given value, using minValue and maxValue as a
 * floor and ceiling.
 *
 * @param value - the value to be normalised
 * @param minValue - the minimum value to serve as the floor of the conversion
 * @param maxValue - the maximum value to serve as the ceiling of the conversion
 * @returns - the normalised value
 */
function normaliseValue(value: number, minValue: number, maxValue: number): number {
    return (value - minValue) / (maxValue - minValue);
}

/**
 * Returns a list of minimum and maximum values for all keyValues contained in the
 * list of given values.
 *
 * @param values - a list of instances from which to analyse keyValues
 * @returns - a list of minimum and maximum values from given instances' keyValues
 */
export function getMinMaxValues(values: IInstance[]): IMinMax[] {
    let minMaxValues: {
        [key: string]: IMinMax
    } = {};

    values.forEach(instance => {
        instance.values.forEach(keyValue => {
            if (minMaxValues[keyValue.key] === undefined) {
                minMaxValues[keyValue.key] = {
                    key: keyValue.key,
                    min: keyValue.value,
                    max: keyValue.value
                };
            } else if (keyValue.value < minMaxValues[keyValue.key].min) {
                minMaxValues[keyValue.key].min = keyValue.value;
            } else if (keyValue.value > minMaxValues[keyValue.key].max) {
                minMaxValues[keyValue.key].max = keyValue.value;
            }
        });
    });

    return Object.keys(minMaxValues).map(key => (<IMinMax>{
        key,
        min: minMaxValues[key].min,
        max: minMaxValues[key].max
    }));
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

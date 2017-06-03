import { ICriterion, IInstance, IKeyValue } from "models";

/**
 * Orders given instances according to the given criteria.
 *
 * @export
 * @param {ICriterion[]} criteria - a set of criteria by which to order the
 *      instances
 * @param {IInstance[]} instances - the instances to be ordered
 * @returns {IInstance[]} - the ordered instances
 */
export function orderInstances(criteria: ICriterion[],
    instances: IInstance[]): IInstance[] {

    return instances.sort((instanceA, instanceB): number => {
        const valueA = instanceA.values.reduce((total, keyValue) => {
            const relevantCriterion = criteria.filter(
                criterion => criterion.key === keyValue.key)[0];

            return total + calculateValue(relevantCriterion, keyValue);
        }, 0);

        const valueB = instanceB.values.reduce((total, keyValue) => {
            const relevantCriterion = criteria.filter(
                criterion => criterion.key === keyValue.key)[0];

            return total + calculateValue(relevantCriterion, keyValue);
        }, 0);

        return valueB - valueA;
    });
};

/**
 * Calculates the value of a matching criterion and keyValue.
 *
 * @param {ICriterion} criterion - a criterion with a key equal to keyValue.key
 * @param {IKeyValue} keyValue - a keyValue with a key equal to criterion.key
 * @returns {number} - the value of the keyValue according to the criterion
 */
function calculateValue(criterion: ICriterion, keyValue: IKeyValue): number {
    const order = criterion.order === "asc" ? 1 : -1;

    return keyValue.value * order * Math.log(criterion.priority);
}

/**
 * Returns whether an instance's keyValues that exist in criteria are missing.
 *
 * @param {ICriterion[]} criteria - the criteria to check keyValues against
 * @param {IKeyValue[]} keyValues - the list of keyValues to check
 * @returns {boolean} - true if a keyValue is missing that exists in criteria
 */
export function isMissingKeyValue(criteria: ICriterion[],
    keyValues: IKeyValue[]): boolean {

    if (criteria.length !== keyValues.length) {
        return true;
    }

    if (criteria.length > 0) {
        return !criteria.every(criterion => keyValues.filter(keyValue =>
            criterion.key === keyValue.key).length === 1);
    }

    return false;
}

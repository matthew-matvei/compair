import { ICriterion, IInstance, IKeyValue } from "models";

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

        return valueA - valueB;
    });
};

function calculateValue(criterion: ICriterion, keyValue: IKeyValue): number {
    const order = criterion.order === "asc" ? 1 : -1;

    return keyValue.value * order * Math.log(criterion.priority);
}

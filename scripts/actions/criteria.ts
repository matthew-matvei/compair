import { createAction } from "redux-actions";

import { ADD_CRITERION, DELETE_CRITERION } from "actions/types";
import { ICriterion, ISubject } from "models";

export const addCriterion = createAction<ISubject, ISubject, ICriterion>(
    ADD_CRITERION,
    (subject: ISubject, criterion: ICriterion): ISubject => {
        return {
            name: subject.name,
            instances: subject.instances,
            criteria: [criterion]
        };
    }
);

export const deleteCriterion = createAction<ISubject, ISubject, string>(
    DELETE_CRITERION,
    (subject: ISubject, key: string): ISubject => {
        return {
            name: subject.name,
            instances: subject.instances,
            criteria: [{ key, order: "asc", priority: 1 }]
        };
    }
);

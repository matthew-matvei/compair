import { createAction } from "redux-actions";

import { ADD_CRITERION, DELETE_CRITERION } from "actions/types";
import { ICriterion } from "models";

export const addCriterion = createAction<ICriterion, ICriterion>(
    ADD_CRITERION,
    (criterion: ICriterion): ICriterion => criterion
);

export const deleteCriterion = createAction<ICriterion, string>(
    DELETE_CRITERION,
    (key: string): ICriterion => { return { key, order: "asc", priority: 1 }; }
);

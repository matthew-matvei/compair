import { createAction } from "redux-actions";

import { ADD_INSTANCE, DELETE_INSTANCE } from "actions/types";
import { IKeyValue, ISubject } from "models";

export const addInstance = createAction<ISubject, ISubject, string, IKeyValue[]>(
    ADD_INSTANCE,
    (subject: ISubject, name: string, values: IKeyValue[]): ISubject => {
        return {
            name: subject.name,
            criteria: subject.criteria,
            instances: [{ name, values }]
        };
    }
);

export const deleteInstance = createAction<ISubject, ISubject, string>(
    DELETE_INSTANCE,
    (subject: ISubject, name: string): ISubject => {
        return {
            name: subject.name,
            criteria: [],
            instances: [{ name, values: [] }]
        };
    }
);

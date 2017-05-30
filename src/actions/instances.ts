import { createAction } from "redux-actions";

import { ADD_INSTANCE, DELETE_INSTANCE } from "actions/types";
import { IInstance, ISubject } from "models";

export const addInstance = createAction<ISubject, ISubject, IInstance>(
    ADD_INSTANCE,
    (subject: ISubject, instance: IInstance): ISubject => {
        return {
            name: subject.name,
            criteria: subject.criteria,
            instances: [instance]
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

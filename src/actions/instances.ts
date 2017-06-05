import { createAction } from "redux-actions";

import {
    ADD_INSTANCE,
    DELETE_INSTANCE,
    RENAME_INSTANCE,
    SET_SELECTED_INSTANCE_NAME
} from "actions/types";
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

export const renameInstance = createAction<IInstance, string, string>(
    RENAME_INSTANCE,
    (fromName: string, toName: string): IInstance => {
        return {
            name: toName,
            oldName: fromName,
            values: []
        };
    }
);

export const setSelectedInstanceName = createAction<string | null,
    string | null>(

    SET_SELECTED_INSTANCE_NAME,
    (name: string | null): string | null => name
    );

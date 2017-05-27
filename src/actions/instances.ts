import { createAction } from "redux-actions";

import { ADD_INSTANCE, DELETE_INSTANCE } from "actions/types";
import { IInstance } from "models";

export const addInstance = createAction<IInstance, string>(
    ADD_INSTANCE,
    (name: string): IInstance => { return { name, values: [] }; }
);

export const deleteInstance = createAction<IInstance, string>(
    DELETE_INSTANCE,
    (name: string): IInstance => { return { name, values: [] }; }
);

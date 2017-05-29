import { createAction } from "redux-actions";

import { ADD_INSTANCE, DELETE_INSTANCE } from "actions/types";
import { IInstance, IKeyValue } from "models";

export const addInstance = createAction<IInstance, string, IKeyValue[]>(
    ADD_INSTANCE,
    (name: string, values: IKeyValue[]): IInstance => {
        return { name, values };
    }
);

export const deleteInstance = createAction<IInstance, string>(
    DELETE_INSTANCE,
    (name: string): IInstance => { return { name, values: [] }; }
);

import { createAction } from "redux-actions";

import {
    ADD_TO_INSTANCE_STORE,
    DELETE_FROM_INSTANCE_STORE
} from "actions/types";
import { IInstance, IKeyValue } from "models";

export const addToInstanceStore = createAction<IInstance, string, IKeyValue[]>(
    ADD_TO_INSTANCE_STORE,
    (name: string, values: IKeyValue[]): IInstance => {
        return { name, values };
    }
);

export const deleteFromInstanceStore = createAction<IInstance, string>(
    DELETE_FROM_INSTANCE_STORE,
    (name: string): IInstance => { return { name, values: [] }; }
);

import { createAction } from "redux-actions";

import { ADD_KEYVALUE } from "actions/types";
import { IKeyValue } from "models";

export const addKeyValue = createAction<IKeyValue, string, number>(
    ADD_KEYVALUE,
    (key: string, value: number): IKeyValue => { return { key, value }; }
);

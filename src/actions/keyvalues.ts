import { createAction } from "redux-actions";

import { ADD_KEYVALUE, DELETE_KEYVALUE } from "actions/types";
import { IKeyValue, ISubject } from "models";

export const addKeyValue = createAction<ISubject, ISubject, IKeyValue>(
    ADD_KEYVALUE,
    (subject: ISubject, keyValue: IKeyValue): ISubject => {
        return {
            name: subject.name,
            criteria: subject.criteria,
            instances: [{
                name: "",
                values: [keyValue]
            }]
        };
    }
);

export const deleteKeyValue = createAction<ISubject, ISubject, string>(
    DELETE_KEYVALUE,
    (subject: ISubject, key: string): ISubject => {
        return {
            name: subject.name,
            criteria: subject.criteria,
            instances: [{
                name: "",
                values: [{
                    key,
                    value: 0
                }]
            }]
        };
    }
);

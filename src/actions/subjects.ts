import { createAction } from "redux-actions";

import { ISubject } from "models";

import {
    ADD_SUBJECT,
    DELETE_SUBJECT
} from "./types";

export const addSubject = createAction<ISubject, string>(
    ADD_SUBJECT,
    (name: string): ISubject => { return { name, values: [] }; }
);

export const deleteSubject = createAction<ISubject, string>(
    DELETE_SUBJECT,
    (name: string): ISubject => { return { name, values: [] }; }
);

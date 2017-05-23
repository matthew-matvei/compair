import { createAction } from "redux-actions";

import { ISubject } from "models";

import {
    ADD_SUBJECT
} from "./types";

export const addSubject = createAction<ISubject, string>(
    ADD_SUBJECT,
    (name: string): ISubject => { return { name }; }
);

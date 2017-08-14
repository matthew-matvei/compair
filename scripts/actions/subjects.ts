import { createAction } from "redux-actions";

import { ISubject } from "models";

import {
    ADD_SUBJECT,
    CREATE_SUBJECT,
    DELETE_SUBJECT,
    RENAME_SUBJECT,
    SET_SELECTED_SUBJECT_NAME
} from "./types";

export const addSubject = createAction<ISubject, ISubject>(
    ADD_SUBJECT,
    (subject: ISubject): ISubject => subject
);

export const createSubject = createAction<ISubject, string>(
    CREATE_SUBJECT,
    (name: string): ISubject => {
        return { name, criteria: [], instances: [] };
    }
);

export const deleteSubject = createAction<ISubject, string>(
    DELETE_SUBJECT,
    (name: string): ISubject => {
        return { name, criteria: [], instances: [] };
    }
);

export const renameSubject = createAction<ISubject, string, string>(
    RENAME_SUBJECT,
    (fromName: string, toName: string): ISubject => {
        return { name: toName, oldName: fromName, criteria: [], instances: [] };
    }
);

export const setSelectedSubjectName = createAction<string, string>(
    SET_SELECTED_SUBJECT_NAME,
    (name: string): string => name
);

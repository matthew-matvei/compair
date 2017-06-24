import { Action, handleActions } from "redux-actions";

import {
    ADD_CRITERION,
    ADD_INSTANCE,
    ADD_SUBJECT,
    CREATE_SUBJECT,
    DELETE_CRITERION,
    DELETE_INSTANCE,
    DELETE_SUBJECT,
    EDIT_CRITERION,
    RENAME_SUBJECT
} from "actions/types";
import { ISubject } from "models";

const initialState: ISubject[] = [];

/**
 * @function makeSubject - Helper function that handles making a subject, both a
 * new one (using just the name) and a full subject read from disk.
 *
 * @param state - the initial array of subjects
 * @param action - the action containing the payload with the subject to make
 *
 * @returns - a list of subjects including the newly made one
 */
const makeSubject = (state: ISubject[], action: Action<ISubject>): ISubject[] => {
    if (!action.payload) {
        return state;
    }

    const subjectExists: boolean = state.some(
        subject => action.payload!.name === subject.name);

    if (!subjectExists) {
        return [action.payload, ...state];
    }

    return state;
};

export default handleActions<ISubject[], ISubject>({

    /**
     * @function ADD_SUBJECT - Prepends a full subject to the list of subjects.
     *
     * @param state - The current list of subjects
     * @param action - The action containing the subject to add
     *
     * @returns - A list of subjects containing the given one
     */
    [ADD_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return makeSubject(state, action);
    },

    /**
     * @function CREATE_SUBJECT - Prepends a newly created subject to the list
     *      of subjects.
     *
     * @param state - The current list of subjects
     * @param action - The action containing the subject to add
     *
     * @returns - A list of subjects containing the given one
     */
    [CREATE_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return makeSubject(state, action);
    },

    /**
     * @function DELETE_SUBJECT - Deletes a subject from a list of subjects.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the subject to delete
     *
     * @returns - A list of subjects not containing the given one
     */
    [DELETE_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return state.filter(subject =>
            action.payload && subject.name !== action.payload.name);
    },

    /**
     * @function RENAME_SUBJECT - Renames the given subject.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the newly-named subject
     *
     * @returns - A list of subjects containing the given one's name
     */
    [RENAME_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return state.map(subject => {

            if (action.payload && action.payload.oldName) {
                if (subject.name === action.payload.oldName) {
                    return <ISubject>{
                        name: action.payload.name,
                        criteria: subject.criteria
                    };
                }
            }

            return subject;
        });
    },

    /**
     * @function ADD_INSTANCE - Adds an instance to a subject.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the subject with the new instance
     *
     * @returns - A list of subjects containing one with the added instance
     */
    [ADD_INSTANCE]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map(subject => {
            if (subject.name === action.payload!.name) {
                const instanceExists = subject.instances.some(
                    instance => instance.name ===
                        action.payload!.instances[0].name);

                if (!instanceExists) {
                    return {
                        name: subject.name,
                        criteria: subject.criteria,
                        instances: [
                            ...subject.instances,
                            action.payload!.instances[0]
                        ]
                    };
                }
            };

            return subject;
        });
    },

    /**
     * @function DELETE_INSTANCE - Deletes an instance from a subject.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the subject with the instance to
     *      delete
     *
     * @returns - A list of subjects with the given instance removed
     */
    [DELETE_INSTANCE]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map(subject => {
            if (subject.name === action.payload!.name) {
                return {
                    name: subject.name,
                    criteria: subject.criteria,
                    instances: subject.instances.filter(
                        instance => instance.name !==
                            action.payload!.instances[0].name)
                };
            }

            return subject;
        });
    },

    /**
     * @function ADD_CRITERION - Adds criterion to a list of criteria.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the subject with the new criterion
     *
     * @returns - A list of subjects containing one with the added criterion
     */
    [ADD_CRITERION]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map(subject => {
            if (subject.name === action.payload!.name) {
                const criterionExists = subject.criteria.some(
                    criterion => criterion.key ===
                        action.payload!.criteria[0].key);

                if (!criterionExists) {
                    return {
                        name: subject.name,
                        instances: subject.instances,
                        criteria: [
                            ...subject.criteria,
                            action.payload!.criteria[0]
                        ]
                    };
                }
            }

            return subject;
        });
    },

    /**
     * @function DELETE_CRITERION - Deletes criterion from a list of criteria.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the subject with the criterion to
     *      delete
     *
     * @returns - A list of subjects with the given criterion removed
     */
    [DELETE_CRITERION]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map(subject => {
            if (subject.name === action.payload!.name) {
                return {
                    name: subject.name,
                    instances: subject.instances,
                    criteria: subject.criteria.filter(
                        criterion => criterion.key !==
                            action.payload!.criteria[0].key)
                };
            }

            return subject;
        });
    },

    /**
     * @function EDIT_CRITERION - Edits criterion from a list of criteria.
     *
     * @param state - The current list of subjects
     * @param action - An action containing the subject with the edited
     *      criterion
     *
     * @returns - A list of subjects with the given criterion edited
     */
    [EDIT_CRITERION]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map(subject => {
            if (subject.name === action.payload!.name) {
                return <ISubject>{
                    name: subject.name,
                    instances: subject.instances,
                    criteria: subject.criteria.map(criterion => {
                        if (criterion.key === action.payload!.criteria[0].key) {
                            return action.payload!.criteria[0];
                        }

                        return criterion;
                    })
                };
            }

            return subject;
        });
    }

}, initialState);

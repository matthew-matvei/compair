import { Action, handleActions } from "redux-actions";

import {
    ADD_CRITERION,
    ADD_INSTANCE,
    ADD_SUBJECT,
    DELETE_CRITERION,
    DELETE_INSTANCE,
    DELETE_SUBJECT,
    RENAME_SUBJECT
} from "actions/types";
import { ISubject } from "models";

const initialState: ISubject[] = [{
    name: "Cities",
    criteria: [{
        key: "Cost of living per month",
        order: "desc",
        priority: 3
    },
    {
        key: "Average salary",
        order: "asc",
        priority: 3
    }],
    instances: [{
        name: "Moscow",
        values: [{
            key: "Cost of living per month",
            value: 100
        },
        {
            key: "Average salary",
            value: 1000
        }]
    }]
}];

export default handleActions<ISubject[], ISubject>({

    [ADD_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        const subjectExists: boolean = state.some(
            subject => action.payload!.name === subject.name);

        if (!subjectExists) {
            return [action.payload, ...state];
        }

        return state;
    },

    [DELETE_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return state.filter((subject: ISubject) =>
            action.payload && subject.name !== action.payload.name);
    },

    [RENAME_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return state.map((subject: ISubject) => {

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

    [ADD_INSTANCE]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map((subject): ISubject => {
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

    [DELETE_INSTANCE]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map((subject): ISubject => {
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

    [ADD_CRITERION]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map((subject): ISubject => {
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

    /*
     * TODO: try to take / return single ISubject
     */

    [DELETE_CRITERION]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        return state.map((subject): ISubject => {
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


}, initialState);

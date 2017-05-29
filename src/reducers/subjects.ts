import { Action, handleActions } from "redux-actions";

import { ADD_SUBJECT, DELETE_SUBJECT, RENAME_SUBJECT } from "actions/types";
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
    }

}, initialState);

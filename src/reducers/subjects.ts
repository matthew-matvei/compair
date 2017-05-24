import { Action, handleActions } from "redux-actions";

import { ADD_SUBJECT, DELETE_SUBJECT } from "actions/types";
import { ISubject } from "models";

const initialState: ISubject[] = [];

export default handleActions<ISubject[], ISubject>({

    [ADD_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (!action.payload) {
            return state;
        }

        const subjectExists: boolean = state.some((subject: ISubject) => {
            if (!action.payload) {
                return false;
            } else {
                return subject.name === action.payload.name;
            }
        });

        if (!subjectExists) {
            return [action.payload, ...state];
        }

        return state;
    },

    [DELETE_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        return state.filter((subject: ISubject) =>
            action.payload && subject.name !== action.payload.name);
    }

}, initialState);

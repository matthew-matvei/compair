import { Action, handleActions } from "redux-actions";

import { ADD_SUBJECT } from "actions/types";
import { ISubject } from "models";

const initialState: ISubject[] = [];

export default handleActions<ISubject[], ISubject>({

    [ADD_SUBJECT]:
    (state: ISubject[], action: Action<ISubject>): ISubject[] => {

        if (action.payload) {
            return [action.payload, ...state];
        } else {
            return state;
        }
    }

}, initialState);

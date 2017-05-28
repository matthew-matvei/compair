import { Action, handleActions } from "redux-actions";

import { SET_SELECTED_SUBJECT } from "actions/types";
import { ISubject } from "models";

const initialState: ISubject = {
    name: "Cities",
    criteria: []
};

export default handleActions<ISubject, ISubject>({

    [SET_SELECTED_SUBJECT]:
    (state: ISubject, action: Action<ISubject>): ISubject => {

        if (!action.payload) {
            return state;
        }

        return {
            name: action.payload.name,
            criteria: []
        };
    }

}, initialState);

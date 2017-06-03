import { Action, handleActions } from "redux-actions";

import { SET_SELECTED_SUBJECT_NAME } from "actions/types";

const initialState: string = "Cities";

export default handleActions<string, string>({

    [SET_SELECTED_SUBJECT_NAME]:
    (state: string, action: Action<string>): string => {

        return action.payload ? action.payload : state;
    }

}, initialState);

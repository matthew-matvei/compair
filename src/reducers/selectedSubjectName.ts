import { Action, handleActions } from "redux-actions";

import { SET_SELECTED_SUBJECT_NAME } from "actions/types";

const initialState: string = "Cities";

export default handleActions<string, string>({

    /**
     * @function SET_SELECTED_SUBJECT_NAME - Set the name of the selected
     *      subject.
     *
     * @param state - The name of the currently selected subject
     * @param action - The action describing the name of the newly selected
     *      subject
     *
     * @returns - The name of the newly selected subject
     */
    [SET_SELECTED_SUBJECT_NAME]:
    (state: string, action: Action<string>): string => {

        return action.payload ? action.payload : state;
    }

}, initialState);

import { Action, handleActions } from "redux-actions";

import { ISubject } from "models";
import { SET_SELECTED_SUBJECT } from "actions/types";

const initialState: ISubject = {
    name: "Blah",
    criteria: [],
    instances: []
};

export default handleActions<ISubject, ISubject>({

    /**
     * @function SET_SELECTED_SUBJECT - Set the name of the selected subject.
     *
     * @param state - The currently selected subject
     * @param action - The action describing the newly selected subject
     *
     * @returns - The newly selected subject
     */
    [SET_SELECTED_SUBJECT]:
    (state: ISubject, action: Action<ISubject>): ISubject => {

        return action.payload ? action.payload : state;
    }

}, initialState);

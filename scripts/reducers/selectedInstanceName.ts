import { Action, handleActions } from "redux-actions";

import { SET_SELECTED_INSTANCE_NAME } from "actions/types";

const initialState: string | null = null;

export default handleActions<string | null, string | null>({

    /**
     * @function SET_SELECTED_INSTANCE_NAME - Sets the selected instance.
     *
     * @param state - The selected instance, if any
     * @param action - The action describing the newly selected instance
     *
     * @returns - The newly selected instance
     */
    [SET_SELECTED_INSTANCE_NAME]:
    (state: string | null, action: Action<string | null>): string | null => {

        return action.payload !== undefined ? action.payload : state;
    }

}, initialState);

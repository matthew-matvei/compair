import { Action, handleActions } from "redux-actions";

import { SET_SELECTED_INSTANCE } from "actions/types";
import { IInstance } from "models";

const initialState: string | null = null;

export default handleActions<string | null, string | null>({

    /**
     * @function SET_SELECTED_INSTANCE - Sets the selected instance.
     *
     * @param state - The selected instance, if any
     * @param action - The action describing the newly selected instance
     *
     * @returns - The newly selected instance
     */
    [SET_SELECTED_INSTANCE]:
    (state: IInstance | null, action: Action<IInstance | null>): IInstance | null => {

        return action.payload !== undefined ? action.payload : state;
    }

}, initialState);

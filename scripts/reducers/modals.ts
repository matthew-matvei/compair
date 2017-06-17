import { Action, handleActions } from "redux-actions";

import { CLOSE_MODAL, OPEN_MODAL } from "actions/types";
import { Modals } from "types";

const initialState: Modals = false;

export default handleActions<Modals, Modals>({

    /**
     * @function OPEN_MODAL - Returns which modal window should be opened.
     *
     * @param state - A descriptor of the currently opened modal window
     * @param action - The action describing which modal window to open
     *
     * @returns - A descriptor of which modal window is to be opened
     */
    [OPEN_MODAL]:
    (state: Modals, action: Action<Modals>): Modals => {
        if (action.payload === undefined) {
            return state;
        }

        return action.payload;
    },

    /**
     * @function CLOSE_MODAL - Returns false to close any open modal dialog.
     *
     * @param state - A descriptor of the currently opened modal window
     * @param action - The action that determines to close any modal window
     *
     * @returns - A descriptor of which modal window is to be opened
     */
    [CLOSE_MODAL]:
    (state: Modals, action: Action<Modals>): Modals => {
        if (action.payload === undefined) {
            return state;
        }

        return action.payload;
    }

}, initialState);

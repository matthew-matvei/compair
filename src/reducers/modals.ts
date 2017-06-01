import { Action, handleActions } from "redux-actions";

import { CLOSE_MODAL, OPEN_MODAL } from "actions/types";
import { Modals } from "types";

const initialState: Modals = false;

export default handleActions<Modals, Modals>({

    [OPEN_MODAL]:
    (state: Modals, action: Action<Modals>): Modals => {
        if (action.payload === undefined) {
            return state;
        }

        return action.payload;
    },

    [CLOSE_MODAL]:
    (state: Modals, action: Action<Modals>): Modals => {
        if (action.payload === undefined) {
            return state;
        }

        return action.payload;
    }

}, initialState);

import { Action, handleActions } from "redux-actions";

import { CLOSE_MODAL, OPEN_MODAL } from "actions/types";

const initialState: boolean = false;

export default handleActions<boolean, boolean>({

    [OPEN_MODAL]:
    (state: boolean, action: Action<boolean>): boolean => action.payload!,

    [CLOSE_MODAL]:
    (state: boolean, action: Action<boolean>): boolean => action.payload!

}, initialState);

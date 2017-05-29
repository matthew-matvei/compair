import { createAction } from "redux-actions";

import { CLOSE_MODAL, OPEN_MODAL } from "actions/types";

export const openModal = createAction<boolean>(
    OPEN_MODAL,
    (): boolean => true
);

export const closeModal = createAction<boolean>(
    CLOSE_MODAL,
    (): boolean => false
);

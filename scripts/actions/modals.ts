import { createAction } from "redux-actions";

import { CLOSE_MODAL, OPEN_MODAL } from "actions/types";
import { Modals } from "types";

export const openModal = createAction<Modals, Modals>(
    OPEN_MODAL,
    (modal: Modals): Modals => modal
);

export const closeModal = createAction<Modals>(
    CLOSE_MODAL,
    (): Modals => false
);

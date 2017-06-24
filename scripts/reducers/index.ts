import { combineReducers } from "redux";

import isShowingModal from "reducers/modals";
import selectedInstance from "reducers/selectedInstance";
import selectedSubject from "reducers/selectedSubject";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    isShowingModal,
    selectedInstance,
    selectedSubject,
    subjects
});

export default rootReducer;

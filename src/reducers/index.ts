import { combineReducers } from "redux";

import isShowingModal from "reducers/modals";
import selectedSubject from "reducers/selectedSubject";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    isShowingModal,
    selectedSubject,
    subjects
});

export default rootReducer;

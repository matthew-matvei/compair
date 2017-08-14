import { combineReducers } from "redux";

import isShowingModal from "reducers/modals";
import selectedInstance from "reducers/selectedInstance";
import selectedSubjectName from "reducers/selectedSubjectName";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    isShowingModal,
    selectedInstance,
    selectedSubjectName,
    subjects
});

export default rootReducer;

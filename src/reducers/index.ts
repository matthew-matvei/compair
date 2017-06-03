import { combineReducers } from "redux";

import isShowingModal from "reducers/modals";
import selectedSubjectName from "reducers/selectedSubjectName";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    isShowingModal,
    selectedSubjectName,
    subjects
});

export default rootReducer;

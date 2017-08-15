import { combineReducers } from "redux";

import isShowingModal from "reducers/modals";
import selectedInstanceName from "reducers/selectedInstanceName";
import selectedSubjectName from "reducers/selectedSubjectName";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    isShowingModal,
    selectedInstanceName,
    selectedSubjectName,
    subjects
});

export default rootReducer;

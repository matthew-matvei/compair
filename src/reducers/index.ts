import { combineReducers } from "redux";

import criteria from "reducers/criteria";
import instances from "reducers/instances";
import instanceStore from "reducers/instanceStore";
import keyvalues from "reducers/keyvalues";
import isShowingModal from "reducers/modals";
import selectedSubject from "reducers/selectedSubject";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    criteria,
    instances,
    instanceStore,
    keyvalues,
    isShowingModal,
    selectedSubject,
    subjects
});

export default rootReducer;

import { combineReducers } from "redux";

import instances from "reducers/instances";
import instanceStore from "reducers/instanceStore";
import keyvalues from "reducers/keyvalues";
import selectedSubject from "reducers/selectedSubject";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    instances,
    instanceStore,
    keyvalues,
    selectedSubject,
    subjects
});

export default rootReducer;

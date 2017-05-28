import { combineReducers } from "redux";

import instances from "reducers/instances";
import instanceStore from "reducers/instanceStore";
import keyvalues from "reducers/keyvalues";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    instances,
    instanceStore,
    subjects,
    keyvalues
});

export default rootReducer;

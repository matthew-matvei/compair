import { combineReducers } from "redux";

import instances from "reducers/instances";
import keyvalues from "reducers/keyvalues";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    instances,
    subjects,
    keyvalues
});

export default rootReducer;

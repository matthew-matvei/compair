import { combineReducers } from "redux";

import keyvalues from "reducers/keyvalues";
import subjects from "reducers/subjects";

const rootReducer = combineReducers({
    subjects,
    keyvalues
});

export default rootReducer;

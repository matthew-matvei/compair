import { Action, handleActions } from "redux-actions";

import { ADD_CRITERION, DELETE_CRITERION } from "actions/types";
import { ICriterion } from "models";

const initialState: ICriterion[] = [];

export default handleActions<ICriterion[], ICriterion>({

    [ADD_CRITERION]:
    (state: ICriterion[], action: Action<ICriterion>): ICriterion[] => {

        if (!action.payload) {
            return state;
        }

        const criterionExists: boolean = state.some(
            criterion => action.payload!.key === criterion.key);

        if (!criterionExists) {
            return [action.payload, ...state];
        }

        return state;
    },

    [DELETE_CRITERION]:
    (state: ICriterion[], action: Action<ICriterion>): ICriterion[] => {

        return state.filter((criterion: ICriterion) =>
            action.payload && criterion.key !== action.payload.key);
    }

}, initialState);

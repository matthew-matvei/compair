import { Action, handleActions } from "redux-actions";

import { ADD_INSTANCE, DELETE_INSTANCE } from "actions/types";
import { IInstance } from "models";

const initialState: IInstance[] = [];

export default handleActions<IInstance[], IInstance>({

    [ADD_INSTANCE]:
    (state: IInstance[], action: Action<IInstance>): IInstance[] => {

        if (!action.payload) {
            return state;
        }

        const instanceExists: boolean = state.some(
            instance => action.payload!.name === instance.name);

        if (!instanceExists) {
            return [action.payload, ...state];
        }

        return state;
    },

    [DELETE_INSTANCE]:
    (state: IInstance[], action: Action<IInstance>): IInstance[] => {

        return state.filter((instance: IInstance) =>
            action.payload && instance.name !== action.payload.name);
    }

}, initialState);

import { Action, handleActions } from "redux-actions";

import {
    ADD_TO_INSTANCE_STORE,
    DELETE_FROM_INSTANCE_STORE
} from "actions/types";
import { IInstance, IInstanceStore } from "models";

const initialState: IInstanceStore = { items: [] };

export default handleActions<IInstanceStore, IInstance>({

    [ADD_TO_INSTANCE_STORE]:
    (state: IInstanceStore, action: Action<IInstance>): IInstanceStore => {

        if (!action.payload) {
            return state;
        }

        const itemExists = state.items.some(
            item => item.subjectName === action.payload!.name);

        if (!itemExists) {
            return {
                items: [
                    { subjectName: action.payload.name, instances: [] },
                    ...state.items
                ]
            };
        }

        return state;
    },

    [DELETE_FROM_INSTANCE_STORE]:
    (state: IInstanceStore, action: Action<IInstance>): IInstanceStore => {

        if (!action.payload) {
            return state;
        }

        return {
            items: state.items.filter(
                item => item.subjectName !== action.payload!.name)
        };
    }

}, initialState);

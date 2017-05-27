import { Action, handleActions } from "redux-actions";

import { ADD_KEYVALUE } from "actions/types";
import { IKeyValue } from "models";

const initialState: IKeyValue[] = [];

export default handleActions<IKeyValue[], IKeyValue>({

    [ADD_KEYVALUE]:
    (state: IKeyValue[], action: Action<IKeyValue>): IKeyValue[] => {

        if (!action.payload) {
            return state;
        }

        const keyValueExists: boolean = state.some(
            keyValue => action.payload!.key === keyValue.key);

        if (!keyValueExists) {
            return [...state, action.payload];
        } else {
            return state.map(keyValue => {
                if (keyValue.key === action.payload!.key) {
                    return action.payload!;
                } else {
                    return keyValue;
                }
            });
        }
    }

}, initialState);

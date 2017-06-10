import { Dispatch } from "redux";

/**
 * The base properties for all dispatchable components.
 *
 * @interface IDispatchableProps
 */
interface IDispatchableProps {

    /**
     * The redux dispatch function that allows access to the central store.
     *
     * @type {Dispatch<{}>}
     * @memberof IDispatchableProps
     */
    dispatch: Dispatch<{}>;
}

export default IDispatchableProps;

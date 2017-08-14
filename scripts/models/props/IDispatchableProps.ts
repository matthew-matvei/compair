import { Dispatch } from "redux";

/**
 * The base properties for all dispatchable components.
 */
interface IDispatchableProps {

    /**
     * The redux dispatch function that allows access to the central store.
     */
    dispatch: Dispatch<{}>;
}

export default IDispatchableProps;

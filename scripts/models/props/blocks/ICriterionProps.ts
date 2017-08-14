import { ICriterion } from "models";
import { Priority } from "types";

/**
 * The properties for a Criterion.
 */
interface ICriterionProps {

    /**
     * Whether this criterion is a new one, if known.
     */
    newCriterion?: boolean;

    /**
     * The key input value, if any.
     */
    keyInputValue?: string;

    /**
     * Whether the order input is checked or not.
     */
    orderInputChecked?: boolean;

    /**
     * The value of the priority input, if any.
     */
    priorityInputValue?: Priority;

    /**
     * An onChange event handler.
     *
     * @param criterion - the criterion on which the event is raised
     */
    onChange?: (criterion: ICriterion) => void;
}

export default ICriterionProps;

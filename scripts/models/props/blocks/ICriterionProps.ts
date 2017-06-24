import { ICriterion } from "models";
import { Priority } from "types";

interface ICriterionProps {
    newCriterion?: boolean;
    keyInputValue?: string;
    orderInputChecked?: boolean;
    priorityInputValue?: Priority;
    onChange?: (criterion: ICriterion) => void;
}

export default ICriterionProps;

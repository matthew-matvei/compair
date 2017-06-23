import { Priority } from "types";

interface ICriterionState {
    keyInputValue: string;
    orderInputChecked: boolean;
    priorityInputValue?: Priority;
}

export default ICriterionState;

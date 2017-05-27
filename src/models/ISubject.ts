import { ICriterion } from "models";

interface ISubject {
    name: string;
    oldName?: string;
    values: ICriterion[];
}

export default ISubject;

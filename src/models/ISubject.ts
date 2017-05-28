import { ICriterion } from "models";

interface ISubject {
    name: string;
    oldName?: string;
    criteria: ICriterion[];
}

export default ISubject;

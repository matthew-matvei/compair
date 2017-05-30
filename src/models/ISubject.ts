import { ICriterion, IInstance } from "models";

interface ISubject {
    name: string;
    criteria: ICriterion[];
    instances: IInstance[];
}

export default ISubject;

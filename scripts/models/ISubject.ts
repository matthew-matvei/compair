import { ICriterion, IInstance } from "models";

/**
 * A subject containing instances.
 */
interface ISubject {

    /**
     * The name of the subject.
     */
    name: string;

    /**
     * The previous name of the subject, if any.
     */
    oldName?: string;

    /**
     * The criteria that each instance of this subject must adhere to.
     */
    criteria: ICriterion[];

    /**
     * All the instances associated with this subject.
     */
    instances: IInstance[];
}

export default ISubject;

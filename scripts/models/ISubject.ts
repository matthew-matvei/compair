import { ICriterion, IInstance } from "models";

/**
 * A subject containing instances.
 *
 * @interface ISubject
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
     *
     * @type {ICriterion[]}
     * @memberof ISubject
     */
    criteria: ICriterion[];

    /**
     * All the instances associated with this subject.
     *
     * @type {IInstance[]}
     * @memberof ISubject
     */
    instances: IInstance[];
}

export default ISubject;

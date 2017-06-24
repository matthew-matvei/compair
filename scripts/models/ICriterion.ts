import { Order, Priority } from "types";

/**
 * A criterion by which its subject is to be compared.
 */
interface ICriterion {

    /**
     * The key of this criterion.
     */
    key: string;

    /**
     * The 'sort' order of this criterion.
     */
    order: Order;

    /**
     * The priority, or importance, of this criterion.
     */
    priority: Priority;
}

export default ICriterion;

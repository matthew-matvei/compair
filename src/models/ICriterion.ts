import { Order, Priority } from "types";

interface ICriterion {

    /**
     * The key of this criterion.
     *
     * @type {string}
     * @memberof ICriterion
     */
    key: string;

    /**
     * The 'sort' order of this criterion.
     *
     * @type {Order}
     * @memberof ICriterion
     */
    order: Order;

    /**
     * The priority, or importance, of this criterion.
     *
     * @type {Priority}
     * @memberof ICriterion
     */
    priority: Priority;
}

export default ICriterion;

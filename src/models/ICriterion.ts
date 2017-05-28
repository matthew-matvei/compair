import { Order, Priority } from "types";

interface ICriterion {
    key: string;
    order: Order;
    priority: Priority;
}

export default ICriterion;

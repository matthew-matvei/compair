interface ICriterion {
    key: string;
    order: "asc" | "desc";
    priority: 1 | 2 | 3 | 4 | 5;
}

export default ICriterion;

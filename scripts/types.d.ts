/**
 * A type describing whether to arrange instances in ascending or decending
 * order.
 */
export type Order = "asc" | "desc";

/**
 * A type describing the accepted values of priority for a criterion.
 */
export type Priority = 1 | 2 | 3 | 4 | 5;

/**
 * A type describing the possible names of modals to be shown.
 */
export type Modals = "addCriterionDialog" | "addInstanceDialog" |
    "editInstanceDialog" | false;

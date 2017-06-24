import { Styles } from "react-modal";

/**
 * Custom stylings for all modal dialog windows.
 */
export const dialogStyles: Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    content: {
        left: "80px",
        right: "80px"
    }
};

/**
 * Filename for user-saved subjects.
 */
export const subjectsFile = ".subjects";

/**
 * The numeric value of the Enter key.
 */
export const enterKey = 13;

/**
 * CSS class names used for dialog styling.
 *
 * @export
 * @interface IDialogStyles
 */
export interface IDialogStyles {

    /**
     * The base styling rules.
     *
     * @type {"string"}
     * @memberof IDialogStyles
     */
    base?: "string";

    /**
     * The styling rules to apply after opening the dialog.
     *
     * @type {"string"}
     * @memberof IDialogStyles
     */
    afterOpen?: "string";

    /**
     * The styling rules to apply before closing the dialog.
     *
     * @type {"string"}
     * @memberof IDialogStyles
     */
    beforeClose?: "string";
}

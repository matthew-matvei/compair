import { IDialogProps } from "models/props";

/**
 * The properties for an EditInstanceDialog.
 *
 * @interface IEditInstanceDialogProps
 * @extends {IDispatchableProps}
 */
interface IEditInstanceDialogProps extends IDialogProps {

    /**
     * The selected instance's name, if any.
     *
     * @type {(string | null)}
     * @memberof IEditInstanceDialogProps
     */
    selectedInstanceName: string | null;
}

export default IEditInstanceDialogProps;

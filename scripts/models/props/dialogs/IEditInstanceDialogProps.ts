import { IInstance } from "models";
import { IDialogProps } from "models/props";

/**
 * The properties for an EditInstanceDialog.
 */
interface IEditInstanceDialogProps extends IDialogProps {

    /**
     * The selected instance, if any.
     */
    selectedInstance: IInstance | null;
}

export default IEditInstanceDialogProps;

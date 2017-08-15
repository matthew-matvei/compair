import { IDialogProps } from "models/props";

/**
 * The properties for an EditInstanceDialog.
 */
interface IEditInstanceDialogProps extends IDialogProps {

    /**
     * The selected instance's name, if any.
     */
    selectedInstanceName: string | null;
}

export default IEditInstanceDialogProps;

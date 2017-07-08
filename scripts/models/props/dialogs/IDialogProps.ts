import { ISubject } from "models";
import { IDispatchableProps } from "models/props";

/**
 * The base properties for all dialogs in this application.
 */
interface IDialogProps extends IDispatchableProps {

    /**
     * Whether this modal should be shown.
     */
    isShowingModal: boolean;

    selectedSubject: ISubject;
}

export default IDialogProps;

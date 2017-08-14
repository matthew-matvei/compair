import { IDispatchableProps, ISubjectsProps } from "models/props";

/**
 * The base properties for all dialogs in this application.
 */
interface IDialogProps extends IDispatchableProps, ISubjectsProps {

    /**
     * Whether this modal should be shown.
     */
    isShowingModal: boolean;
}

export default IDialogProps;

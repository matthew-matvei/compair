import { ISubject } from "models";
import { IDispatchableProps } from "models/props";

/**
 * The base properties for all dialogs in this application.
 *
 * @interface IDialogProps
 * @extends {IDispatchableProps}
 */
interface IDialogProps extends IDispatchableProps {

    /**
     * The subjects in the application.
     *
     * @type {ISubject[]}
     * @memberof IDialogProps
     */
    subjects: ISubject[];

    /**
     * The selected subject's name.
     *
     * @type {string}
     * @memberof IDialogProps
     */
    selectedSubjectName: string;

    /**
     * Whether this modal should be shown.
     *
     * @type {boolean}
     * @memberof IDialogProps
     */
    isShowingModal: boolean;
}

export default IDialogProps;

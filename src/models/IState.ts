import { ISubject } from "models";
import { Modals } from "types";

interface IState {

    /**
     * A list of subjects in the application.
     *
     * @type {ISubject[]}
     * @memberof IState
     */
    subjects: ISubject[];

    /**
     * The name of the subject currently selected.
     *
     * @type {string}
     * @memberof IState
     */
    selectedSubjectName: string;

    /**
     * The name of the instance currently selected, if any.
     *
     * @type {(string | null)}
     * @memberof IState
     */
    selectedInstanceName: string | null;

    /**
     * Whether the modal is showing and if so, which one.
     *
     * @type {Modals}
     * @memberof IState
     */
    isShowingModal: Modals;
}

export default IState;

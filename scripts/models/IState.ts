import { IInstance, ISubject } from "models";
import { Modals } from "types";

/**
 * The state of the application's central store.
 */
interface IState {

    /**
     * A list of subjects in the application.
     */
    subjects: ISubject[];

    /**
     * The name of the currently selected subject.
     */
    selectedSubjectName: string;

    /**
     * The name of the instance currently selected, if any.
     */
    selectedInstance: IInstance | null;

    /**
     * Whether the modal is showing and if so, which one.
     */
    isShowingModal: Modals;
}

export default IState;

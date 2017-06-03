import { ISubject } from "models";
import { Modals } from "types";

interface IState {
    subjects: ISubject[];
    selectedSubjectName: string;
    isShowingModal: Modals;
}

export default IState;

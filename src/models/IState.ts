import { ISubject } from "models";
import { Modals } from "types";

interface IState {
    subjects: ISubject[];
    selectedSubject: ISubject;
    isShowingModal: Modals;
}

export default IState;

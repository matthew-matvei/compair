import { ISubject } from "models";

interface IState {
    subjects: ISubject[];
    selectedSubject: ISubject;
    isShowingModal: boolean;
}

export default IState;

import { IInstanceStore, ISubject } from "models";

interface IState {
    subjects: ISubject[];
    selectedSubject: ISubject;
    instanceStore: IInstanceStore;
    isShowingModal: boolean;
}

export default IState;

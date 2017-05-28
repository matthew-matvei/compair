import { IInstanceStore, ISubject } from "models";

interface IState {
    subjects: ISubject[];
    selectedSubject: ISubject;
    instanceStore: IInstanceStore;
}

export default IState;

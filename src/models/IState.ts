import { IInstance, ISubject } from "models";

interface IState {
    subjects: ISubject[];
    selectedSubject: ISubject;
    instanceStore: IInstance[][];
}

export default IState;

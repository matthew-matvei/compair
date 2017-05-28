import { IInstanceStore, ISubject } from "models";
import { IDispatchableProps } from ".";

interface IInstancesPanelProps extends IDispatchableProps {
    selectedSubject: ISubject;
    instanceStore: IInstanceStore;
}

export default IInstancesPanelProps;

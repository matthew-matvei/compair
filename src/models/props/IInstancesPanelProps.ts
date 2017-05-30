import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface IInstancesPanelProps extends IDispatchableProps {
    selectedSubject: ISubject;
    subjects: ISubject[];
}

export default IInstancesPanelProps;

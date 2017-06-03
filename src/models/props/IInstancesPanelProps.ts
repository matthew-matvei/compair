import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface IInstancesPanelProps extends IDispatchableProps {
    selectedSubjectName: string;
    subjects: ISubject[];
}

export default IInstancesPanelProps;

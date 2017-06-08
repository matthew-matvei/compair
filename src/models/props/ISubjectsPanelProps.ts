import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface ISubjectsPanelProps extends IDispatchableProps {
    subjects: ISubject[];
    selectedSubjectName: string;
}

export default ISubjectsPanelProps;

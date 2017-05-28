import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface ISubjectsPanelProps extends IDispatchableProps {
    subjects: ISubject[];
}

export default ISubjectsPanelProps;

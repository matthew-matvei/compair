import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface IDialogProps extends IDispatchableProps {
    subjects: ISubject[];
    selectedSubjectName: string;
    isShowingModal: boolean;
}

export default IDialogProps;

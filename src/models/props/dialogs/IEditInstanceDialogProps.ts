import { ISubject } from "models";
import { IDispatchableProps } from "models/props";

interface IEditInstanceDialogProps extends IDispatchableProps {
    selectedInstanceName: string | null;
    selectedSubjectName: string;
    subjects: ISubject[];
    isShowingModal: boolean;
}

export default IEditInstanceDialogProps;

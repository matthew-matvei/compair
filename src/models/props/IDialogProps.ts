import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface IDialogProps extends IDispatchableProps {
    subjects: ISubject[];
    selectedSubject: ISubject;
    isShowingModal: boolean;
}

export default IDialogProps;

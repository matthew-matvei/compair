import { ISubject } from "models";
import { IDispatchableProps } from ".";

interface IInstancesPanelProps extends IDispatchableProps {
    selectedSubject: ISubject;
}

export default IInstancesPanelProps;

import { IInstance, ISubject } from "models";

interface IInstanceCardProps {
    instance: IInstance | null;
    currentSubject: ISubject | null;
    deleteInstance?: (instance: IInstance) => void;
}

export default IInstanceCardProps;

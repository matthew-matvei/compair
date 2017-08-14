import { IInstance, ISubject } from "models";

/**
 * The properties for the InstanceCard.
 */
interface IInstanceCardProps {

    /**
     * The instance that this card represent, if any.
     */
    instance: IInstance | null;

    /**
     * The current subject, if any instance exists.
     */
    currentSubject: ISubject | null;

    /**
     * A callback function to delete the instance, if any.
     */
    deleteInstance?: (instance: IInstance) => void;

    /**
     * A callback function to edit the instance, if any.
     */
    editInstance?: (instance: IInstance) => void;

    /**
     * A callback function to open the AddInstanceDialog.
     */
    openDialog?: () => void;
}

export default IInstanceCardProps;

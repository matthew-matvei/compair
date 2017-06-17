import { IInstance, ISubject } from "models";

/**
 * The properties for the InstanceCard.
 *
 * @interface IInstanceCardProps
 */
interface IInstanceCardProps {

    /**
     * The instance that this card represent, if any.
     *
     * @type {(IInstance | null)}
     * @memberof IInstanceCardProps
     */
    instance: IInstance | null;

    /**
     * The current subject, if any instance exists.
     *
     * @type {(ISubject | null)}
     * @memberof IInstanceCardProps
     */
    currentSubject: ISubject | null;

    /**
     * A callback function to delete the instance, if any.
     *
     * @memberof IInstanceCardProps
     */
    deleteInstance?: (instance: IInstance) => void;

    /**
     * A callback function to edit the instance, if any.
     *
     * @memberof IInstanceCardProps
     */
    editInstance?: (instance: IInstance) => void;

    /**
     * A callback function to open the AddInstanceDialog.
     *
     * @memberof IInstanceCardProps
     */
    openDialog?: () => void;
}

export default IInstanceCardProps;

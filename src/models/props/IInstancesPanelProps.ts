import { ISubject } from "models";
import { IDispatchableProps } from ".";

/**
 * The properties for the InstancesPanel.
 *
 * @interface IInstancesPanelProps
 * @extends {IDispatchableProps}
 */
interface IInstancesPanelProps extends IDispatchableProps {

    /**
     * The selected subject's name.
     *
     * @type {string}
     * @memberof IInstancesPanelProps
     */
    selectedSubjectName: string;

    /**
     * The subjects in the application.
     *
     * @type {ISubject[]}
     * @memberof IInstancesPanelProps
     */
    subjects: ISubject[];
}

export default IInstancesPanelProps;

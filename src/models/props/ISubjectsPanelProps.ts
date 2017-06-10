import { ISubject } from "models";
import { IDispatchableProps } from ".";

/**
 * The properties for the SubjectsPanel.
 *
 * @interface ISubjectsPanelProps
 * @extends {IDispatchableProps}
 */
interface ISubjectsPanelProps extends IDispatchableProps {

    /**
     * The subjects in the application.
     *
     * @type {ISubject[]}
     * @memberof ISubjectsPanelProps
     */
    subjects: ISubject[];

    /**
     * The selected subject's name.
     *
     * @type {string}
     * @memberof ISubjectsPanelProps
     */
    selectedSubjectName: string;
}

export default ISubjectsPanelProps;

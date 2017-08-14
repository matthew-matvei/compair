import { ISubject } from "models";

/**
 * The properties for all components that track subjects.
 */
interface ISubjectsProps {

    /**
     * The selected subject's name.
     */
    selectedSubjectName: string;

    /**
     * The subjects in the application.
     */
    subjects: ISubject[];
}

export default ISubjectsProps;

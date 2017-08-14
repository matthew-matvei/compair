import { ISubject } from "models";

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

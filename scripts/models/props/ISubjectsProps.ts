import { ISubject } from "models";

interface ISubjectsProps {

    /**
     * The selected subject's name.
     */
    selectedSubject: ISubject;

    /**
     * The subjects in the application.
     */
    subjects: ISubject[];
}

export default ISubjectsProps;

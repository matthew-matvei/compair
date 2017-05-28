import { Dispatch } from "redux";

import { ISubject } from "models";

interface ISubjectsPanelProps {
    subjects: ISubject[];
    dispatch: Dispatch<{}>;
}

export default ISubjectsPanelProps;

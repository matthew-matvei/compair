import * as React from "react";

import { ISubjectsPanelProps } from "models/props";

export default class SubjectsPanel extends
    React.Component<ISubjectsPanelProps, {}> {

    public render(): JSX.Element {
        return <nav className="col-sm-4 col-md-3 bg-faded sidebar">
            <ul>
                <li>Subjects will go here</li>
            </ul>
        </nav>;
    }
}

import * as React from "react";
import { connect } from "react-redux";

import { IState } from "models";
import { ISubjectsPanelProps } from "models/props";

class SubjectsPanel extends React.Component<ISubjectsPanelProps, {}> {

    public render(): JSX.Element {
        const subjectElements = this.props.subjects.map(subject =>
            <li className="nav-item" key={subject.name}>
                <div className="btn-group btn-block">
                    <button className="nav-link btn btn-primary btn-block">
                        {subject.name}
                    </button>
                    <button className="nav-link btn btn-secondary">?</button>
                </div>
            </li>
        );

        return <nav className="col-sm-4 col-md-3 bg-faded sidebar">
            <ul className="nav nav-pills flex-column">
                {subjectElements}
                <li className="nav-item">
                    <input type="text" placeholder="add subject" />
                </li>
            </ul>
        </nav>;
    }
}

const mapStateToProps = (state: IState) => ({
    subjects: state.subjects
});

export default connect(mapStateToProps)(SubjectsPanel);
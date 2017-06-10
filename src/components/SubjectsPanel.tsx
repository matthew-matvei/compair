import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { addSubject, setSelectedSubject } from "actions/subjects";
import { AddCriteriaDialog } from "components";
import { IState } from "models";
import { ISubjectsPanelProps } from "models/props";

class SubjectsPanel extends React.Component<ISubjectsPanelProps, {}> {

    public render(): JSX.Element {
        const subjectElements = this.props.subjects.map(subject => {
            const selected = classNames({
                "active": subject.name === this.props.selectedSubjectName
            });

            return <div className="btn-group btn-block">
                <button className={`btn btn-primary btn-block ${selected}`}
                    id={subject.name}
                    onClick={this.handleClick.bind(this)}>
                    {subject.name}
                </button>
                <AddCriteriaDialog />
            </div>;
        });

        return <nav className="col-sm-4 col-md-3 bg-faded sidebar">
            <ul className="list-group flex-column">
                <li className="list-group-item">
                    {subjectElements}
                </li>
                <li className="list-group-item">
                    <input type="text"
                        className="form-control"
                        placeholder="add subject"
                        onKeyDown={this.handleKeyDown.bind(this)} />
                </li>
            </ul>
        </nav>;
    }

    private handleKeyDown(event: any) {
        // 13 = Enter key
        if (event.which === 13) {
            const newSubjectName = event.target.value.trim();
            this.props.dispatch(addSubject(newSubjectName));
            event.target.value = "";
        }
    }

    private handleClick(event: Event) {
        const typedTarget = event.target as HTMLButtonElement;
        this.props.dispatch(setSelectedSubject(typedTarget.id));
    }
}

const mapStateToProps = (state: IState) => ({
    subjects: state.subjects,
    selectedSubjectName: state.selectedSubjectName
});

export default connect(mapStateToProps)(SubjectsPanel);

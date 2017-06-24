import * as classNames from "classnames";
import * as React from "react";
import { Icon } from "react-fa";
import { connect } from "react-redux";

import { openModal } from "actions/modals";
import { enterKey } from "const";
import { createSubject, setSelectedSubject } from "actions/subjects";
import { AddCriteriaDialog } from "components";
import { IState } from "models";
import { ISubjectsPanelProps } from "models/props";

/**
 * The panel containing all the current subjects in the application.
 */
class SubjectsPanel extends React.Component<ISubjectsPanelProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        const subjectElements = this.props.subjects.map(subject => {
            const selected = classNames({
                "active": subject.name === this.props.selectedSubject.name
            });

            return <div className="btn-group btn-block">
                <button className={`btn btn-primary btn-block ${selected}`}
                    id={subject.name}
                    onClick={this.handleClickSetSelectedSubject.bind(this)}>
                    {subject.name}
                </button>
                <button className="btn btn-secondary"
                    id={subject.name}
                    onClick={this.handleClickOpenDialog.bind(this)}>
                    <Icon id={subject.name} name="bars"
                        onClick={this.handleClickOpenDialog.bind(this)} />
                </button>
                <AddCriteriaDialog />
            </div>;
        });

        return <nav className="col-sm-4 col-md-3 bg-faded sidebar">
            <ul className="list-group flex-column">
                {this.props.subjects.length > 0 && <li className="list-group-item">
                    {subjectElements}
                </li>}
                <li className="list-group-item">
                    <input type="text"
                        className="form-control"
                        placeholder="Subject name..."
                        onKeyDown={this.handleKeyDown.bind(this)} />
                </li>
            </ul>
        </nav>;
    }

    /**
     * Handles adding a subject on user pressing the Enter key.
     *
     * @param event - The key event
     */
    private handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.which === enterKey) {
            const typedTarget = event.target as HTMLInputElement;
            const newSubjectName = typedTarget.value.trim();
            this.props.dispatch(createSubject(newSubjectName));
            typedTarget.value = "";
        }
    }

    /**
     * Handles opening the dialog to add a criterion and sets the selected
     * subject.
     *
     * @param event - the event from which to take the target's id
     */
    private handleClickOpenDialog(event: React.MouseEvent<HTMLInputElement>) {
        this.handleClickSetSelectedSubject(event);
        this.props.dispatch(openModal("addCriterionDialog"));
    }

    /**
     * Handles setting the selected subject on user clicking its button.
     *
     * @param event - the event from which to identify the selected subject
     */
    private handleClickSetSelectedSubject(event: React.MouseEvent<HTMLButtonElement>) {
        const typedTarget = event.target as HTMLButtonElement;
        const subject = this.props.subjects.find(subject => subject.name === typedTarget.id)!;
        this.props.dispatch(setSelectedSubject(subject));
    }
}

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
 *
 * @param state - The central state of the application
 * @returns - This component's props, taken from the application state
 */
const mapStateToProps = (state: IState) => ({
    subjects: state.subjects,
    selectedSubject: state.selectedSubject
});

export default connect(mapStateToProps)(SubjectsPanel);

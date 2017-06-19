import * as classNames from "classnames";
import * as React from "react";
import { Icon } from "react-fa";
import { connect } from "react-redux";

import { openModal } from "actions/modals";
import { createSubject, setSelectedSubject } from "actions/subjects";
import { AddCriteriaDialog } from "components";
import { IState } from "models";
import { ISubjectsPanelProps } from "models/props";

/**
 * The panel containing all the current subjects in the application.
 *
 * @class SubjectsPanel
 * @extends {React.Component<ISubjectsPanelProps, {}>}
 */
class SubjectsPanel extends React.Component<ISubjectsPanelProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element} - The JSX required to create this component
     *
     * @memberof SubjectsPanel
     */
    public render(): JSX.Element {
        const subjectElements = this.props.subjects.map(subject => {
            const selected = classNames({
                "active": subject.name === this.props.selectedSubjectName
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
                <li className="list-group-item">
                    {subjectElements}
                </li>
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
     * Handles adding a subject on user pressing a key down.
     *
     * @private
     * @param {*} event - The key event
     *
     * @memberof SubjectsPanel
     */
    private handleKeyDown(event: any) {
        // 13 = Enter key
        if (event.which === 13) {
            const newSubjectName = event.target.value.trim();
            this.props.dispatch(createSubject(newSubjectName));
            event.target.value = "";
        }
    }

    /**
     * Handles opening the dialog to add a criterion and sets the selected
     * subject.
     *
     * @private
     * @param {Event} event - the event from which to take the target's id
     *
     * @memberof SubjectsPanel
     */
    private handleClickOpenDialog(event: Event) {
        this.handleClickSetSelectedSubject(event);
        this.props.dispatch(openModal("addCriterionDialog"));
    }

    /**
     * Handles setting the selected subject on user clicking its button.
     *
     * @private
     * @param {Event} event - the event from which to take the target's id
     *
     * @memberof SubjectsPanel
     */
    private handleClickSetSelectedSubject(event: Event) {
        const typedTarget = event.target as HTMLButtonElement;
        this.props.dispatch(setSelectedSubject(typedTarget.id));
    }
}

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
 * @param state - The central state of the application
 * @returns - This component's props, taken from the application state
 */
const mapStateToProps = (state: IState) => ({
    subjects: state.subjects,
    selectedSubjectName: state.selectedSubjectName
});

export default connect(mapStateToProps)(SubjectsPanel);

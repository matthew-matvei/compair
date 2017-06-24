
import * as React from "react";
import { Icon } from "react-fa";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addCriterion, editCriterion } from "actions/criteria";
import { closeModal } from "actions/modals";
import { deleteSubject } from "actions/subjects";
import { Criterion } from "components";
import { dialogStyles } from "const";
import { ICriterion, IState } from "models";
import { IAddCriteriaDialogProps } from "models/props";
import { Priority } from "types";

/**
 * A dialog for creating new criteria.
 */
class AddCriteriaDialog extends React.Component<IAddCriteriaDialogProps, {}> {

    private newCriterion: Criterion;

    private criteria: {
        [criterionKey: string]: Criterion
    } = {};

    /**
     * Defines the rendering of this component.
     */
    public render(): JSX.Element | null {

        const selectedSubject = this.props.subjects.find(subject =>
            subject.name === this.props.selectedSubjectName);

        if (!selectedSubject) {
            return null;
        }

        const criteriaElements = selectedSubject.criteria.map(criterion => {
            return <Criterion key={criterion.key}
                ref={(criterionElement) =>
                    this.criteria[criterion.key] = criterionElement}
                onChange={this.handleCriterionChange.bind(this)}
                keyInputValue={criterion.key}
                orderInputChecked={criterion.order === "asc"}
                priorityInputValue={criterion.priority} />;
        });

        return <ReactModal isOpen={this.props.isShowingModal}
            contentLabel="AddCriteraDialog"
            onRequestClose={this.handleRequestClose.bind(this)}
            style={dialogStyles}>
            <div className="card">
                <div className="card-header dialog-header">
                    <h2 className="card-title text-muted">
                        {`Add a criterion - ${this.props.selectedSubjectName}`}
                    </h2>
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        <Icon name="close" />
                    </button>
                </div>
                <div className="card-block">
                    <Criterion ref={(criterion) =>
                        this.newCriterion = criterion}
                        newCriterion />
                </div>
                <div className="card-block">
                    {criteriaElements}
                </div>
                <div className="card-footer text-right">
                    <button className="btn btn-danger mr-3"
                        onClick={this.handleClickDelete.bind(this)}>
                        Delete
                    </button>
                    <button className="btn btn-primary mr-3"
                        onClick={this.handleClickCreate.bind(this)}>
                        Create
                    </button>
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        Close
                    </button>
                </div>
            </div>
        </ReactModal>;
    }

    /**
     * Handles creating the new criterion on the user clicking 'create'.
     */
    private handleClickCreate() {
        const currentSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName)!;

        const criterion = this.newCriterion.state;

        this.props.dispatch(addCriterion(currentSubject, {
            key: criterion.keyInputValue,
            order: criterion.orderInputChecked ? "asc" : "desc",
            priority: (criterion.priorityInputValue || 1) as Priority
        }));
        this.handleRequestClose();
    }

    private handleClickDelete() {
        const currentSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName)!;

        this.props.dispatch(deleteSubject(currentSubject.name));
        this.handleRequestClose();
    }

    private handleCriterionChange(criterion: ICriterion) {
        const currentSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName)!;

        this.props.dispatch(editCriterion(currentSubject, criterion));
    }

    /**
     * Handles closing the modal and nulling the modals inputs, since the
     * dialog component is not actually dismounted from the DOM.
     */
    private handleRequestClose() {
        this.props.dispatch(closeModal());
    }
}

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
 * @param state - The central state of the application
 * @returns - This component's props, taken from the application state
 */
const mapStateToProps = (state: IState) => ({
    selectedSubjectName: state.selectedSubjectName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "addCriterionDialog"
});

export default connect(mapStateToProps)(AddCriteriaDialog);

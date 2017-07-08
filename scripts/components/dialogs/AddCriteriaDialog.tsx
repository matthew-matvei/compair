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

    /**
     * A reference to the new criterion to be created.
     */
    private newCriterion: Criterion;

    /**
     * Defines the rendering of this component.
     */
    public render(): JSX.Element | null {
        const { selectedSubject } = this.props;

        if (!selectedSubject) {
            return null;
        }

        const criteriaElements = selectedSubject.criteria.map(criterion => {
            return <Criterion key={criterion.key}

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
                        {`Add a criterion - ${this.props.selectedSubject.name}`}
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
                        onClick={this.handleClickCreate.bind(this)}
                        disabled={this.newCriterion &&
                            this.newCriterion.state.keyInputValue === ""}>
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
        const criterion = this.newCriterion.state;

        if (criterion.keyInputValue) {
            this.props.dispatch(addCriterion(this.props.selectedSubject, {
                key: criterion.keyInputValue,
                order: criterion.orderInputChecked ? "asc" : "desc",
                priority: (criterion.priorityInputValue || 1) as Priority
            }));
            this.handleRequestClose();
        }
    }

    /**
     * Handles deleting the subject on the user clicking 'delete'.
     */
    private handleClickDelete() {
        this.props.dispatch(deleteSubject(this.props.selectedSubject.name));
        this.handleRequestClose();
    }

    /**
     * Handles editing a criterion upon any of its values changing.
     *
     * @param criterion - The criterion to edit
     */
    private handleCriterionChange(criterion: ICriterion) {
        this.props.dispatch(editCriterion(this.props.selectedSubject, criterion));
    }

    /**
     * Handles closing the modal.
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
    selectedSubject: state.selectedSubject,
    isShowingModal: state.isShowingModal === "addCriterionDialog"
});

export default connect(mapStateToProps)(AddCriteriaDialog);

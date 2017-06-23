
import * as React from "react";
import { Icon } from "react-fa";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addCriterion } from "actions/criteria";
import { closeModal } from "actions/modals";
import { deleteSubject } from "actions/subjects";
import { Criterion } from "components";
import { dialogStyles } from "const";
import { IState } from "models";
import { IAddCriteriaDialogProps } from "models/props";
import { Priority } from "types";

/**
 * A dialog for creating new criteria.
 *
 * @class AddCriteriaDialog
 * @extends {React.Component<IAddCriteriaDialogProps, {}>}
 */
class AddCriteriaDialog extends React.Component<IAddCriteriaDialogProps, {}> {

    private newCriterion: Criterion;

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element | null} - The JSX required to create this component
     *
     * @memberof AddCriteriaDialog
     */
    public render(): JSX.Element | null {

        const selectedSubject = this.props.subjects.find(subject =>
            subject.name === this.props.selectedSubjectName);

        if (!selectedSubject) {
            return null;
        }

        const criteriaElements = selectedSubject.criteria.map(criterion => {
            // const orderTooltip = criterion.order === "asc" ?
            //     "The more the merrier!" : "Smaller wins, like golf!";

            return (
                /*<form className="form-inline pb-2"
                    key={`form-${criterion.key}`}>
                    <div className="input-group col-6">
                        <span className="input-group-addon">Criterion Key</span>
                        <input type="text" className="form-control"
                            id={criterion.key}
                            value={criterion.key} />
                    </div>
                    <div className="input-group col-2">
                        <Tooltip overlay={<span>{orderTooltip}</span>}>
                            <label className="form-check-label">
                                <input type="checkbox"
                                    className="form-check-input"
                                    checked={criterion.order === "asc"} />
                                Ascending
                            </label>
                        </Tooltip>
                    </div>
                    <div className="input-group col-4">
                        <span className="input-group-addon">Priority</span>
                        <Tooltip overlay={
                            <span>
                                1 = unimportant; 5 = very important
                            </span>}>
                            <input type="number" className="form-control"
                                min="1" max="5" value={criterion.priority} />
                        </Tooltip>
                    </div>
                </form>*/
                <Criterion keyInputValue={criterion.key}
                    orderInputChecked={criterion.order === "asc"}
                    priorityInputValue={criterion.priority} />);
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
                        this.newCriterion = criterion} />
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
                        Cancel
                    </button>
                </div>
            </div>
        </ReactModal>;
    }

    /**
     * Handles creating the new criterion on the user clicking 'create'.
     *
     * @private
     *
     * @memberof AddCriteriaDialog
     */
    private handleClickCreate() {
        const currentSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName)!;

        /*this.props.dispatch(addCriterion(currentSubject, {
            key: this.criterionKeyInput.value,
            order: this.criterionOrderInput.checked ? "asc" : "desc",
            priority: parseInt(this.criterionPriorityInput.value) as Priority
        }));*/
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

    /**
     * Handles closing the modal and nulling the modals inputs, since the
     * dialog component is not actually dismounted from the DOM.
     *
     * @private
     *
     * @memberof AddCriteriaDialog
     */
    private handleRequestClose() {
        this.props.dispatch(closeModal());
        this.cleanInputs();
    }

    /**
     * Clears the values for the modals inputs.
     *
     * @private
     *
     * @memberof AddCriteriaDialog
     */
    private cleanInputs() {
        /*this.criterionKeyInput.value = "";
        this.criterionOrderInput.checked = false;
        this.criterionPriorityInput.value = "";*/
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

import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addCriterion } from "actions/criteria";
import { closeModal, openModal } from "actions/modals";
import { IState } from "models";
import { IAddCriteriaDialogProps } from "models/props/dialogs";
import { Priority } from "types";

/**
 * A dialog for creating new criteria.
 *
 * @class AddCriteriaDialog
 * @extends {React.Component<IAddCriteriaDialogProps, {}>}
 */
class AddCriteriaDialog extends React.Component<IAddCriteriaDialogProps, {}> {

    /**
     * The text input for the new criterion's key.
     *
     * @private
     * @type {HTMLInputElement}
     * @memberof AddCriteriaDialog
     */
    private criterionKeyInput: HTMLInputElement;

    /**
     * The checkbox input for the new criterion's order.
     *
     * @private
     * @type {HTMLInputElement}
     * @memberof AddCriteriaDialog
     */
    private criterionOrderInput: HTMLInputElement;

    /**
     * The number input for the new criterion's priority.
     *
     * @private
     * @type {HTMLInputElement}
     * @memberof AddCriteriaDialog
     */
    private criterionPriorityInput: HTMLInputElement;

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element} - The JSX required to create this component
     *
     * @memberof AddCriteriaDialog
     */
    public render(): JSX.Element {

        const selectedSubject = this.props.subjects.filter(subject =>
            subject.name === this.props.selectedSubjectName)[0];
        const criteriaElements = selectedSubject.criteria.map(criterion =>
            <form className="form-inline pb-2">
                <div className="input-group col-6">
                    <span className="input-group-addon">Criterion Key</span>
                    <input type="text" className="form-control"
                        value={criterion.key} />
                </div>
                <div className="input-group col-2">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            checked={criterion.order === "asc"} />
                        Ascending
                    </label>
                </div>
                <div className="input-group col-4">
                    <span className="input-group-addon">Priority</span>
                    <input type="number" min="1" max="5"
                        value={criterion.priority} />
                </div>
            </form>);

        return <div>
            <button className="btn btn-secondary"
                onClick={this.handleClick.bind(this)}>?</button>
            <ReactModal isOpen={this.props.isShowingModal}
                contentLabel="AddCriteraDialog"
                onRequestClose={this.handleRequestClose.bind(this)}>
                <div className="card">
                    <div className="card-header text-right">
                        <button className="btn btn-secondary"
                            onClick={this.handleRequestClose.bind(this)}>
                            x
                            </button>
                    </div>
                    <div className="card-block">
                        <form className="form-inline">
                            <div className="input-group col-6">
                                <span className="input-group-addon">
                                    Criterion Key
                            </span>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Create criterion"
                                    ref={(input) =>
                                        this.criterionKeyInput = input} />
                            </div>
                            <div className="input-group col-2">
                                <label className="form-check-label">
                                    <input type="checkbox"
                                        className="form-check-input"
                                        ref={(input) =>
                                            this.criterionOrderInput = input} />
                                    Ascending
                            </label>
                            </div>
                            <div className="input-group col-4">
                                <span className="input-group-addon">
                                    Priority
                                </span>
                                <input type="number" min="1" max="5"
                                    ref={(input) =>
                                        this.criterionPriorityInput = input} />
                            </div>
                        </form>
                    </div>
                    <div className="card-block">
                        {criteriaElements}
                    </div>
                    <div className="card-footer text-right">
                        <button className="btn btn-primary"
                            onClick={this.handleClickCreate.bind(this)}>
                            Create
                            </button>
                        <button className="btn btn-secondary"
                            onClick={this.handleRequestClose.bind(this)}>
                            Cancel
                            </button>
                    </div>
                </div>
            </ReactModal>
        </div>;
    }

    /**
     * Handles opening the modal on a user clicking the button.
     *
     * @private
     *
     * @memberof AddCriteriaDialog
     */
    private handleClick() {
        this.props.dispatch(openModal("addCriterionDialog"));
    }

    /**
     * Handles creating the new criterion on the user clicking 'create'.
     *
     * @private
     *
     * @memberof AddCriteriaDialog
     */
    private handleClickCreate() {
        const currentSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];
        this.props.dispatch(addCriterion(currentSubject, {
            key: this.criterionKeyInput.value,
            order: this.criterionOrderInput.checked ? "asc" : "desc",
            priority: parseInt(this.criterionPriorityInput.value) as Priority
        }));
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
        this.criterionKeyInput.value = "";
        this.criterionOrderInput.checked = false;
        this.criterionPriorityInput.value = "";
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

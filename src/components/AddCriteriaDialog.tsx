import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addCriterion } from "actions/criteria";
import { closeModal, openModal } from "actions/modals";
import { IState } from "models";
import { IAddCriteriaDialogProps } from "models/props";
import { Priority } from "types";

class AddCriteriaDialog extends React.Component<IAddCriteriaDialogProps, {}> {

    private criterionKeyInput: HTMLInputElement;
    private criterionOrderInput: HTMLInputElement;
    private criterionPriorityInput: HTMLInputElement;

    public render(): JSX.Element {

        const selectedSubject = this.props.subjects.filter(subject =>
            subject.name === this.props.selectedSubject.name)[0];
        const criteriaElements = selectedSubject.criteria.map(criterion =>
            <div className="col-12">
                <div className="input-group">
                    <span className="input-group-addon">Criterion Key</span>
                    <input type="text" className="form-control"
                        value={criterion.key} />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">Order</span>
                    <input type="checkbox" className="form-control"
                        checked={criterion.order === "asc"} />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">Priority</span>
                    <input type="number" min="1" max="5"
                        value={criterion.priority} />
                </div>
            </div>);

        return <div>
            <button className="nav-link btn btn-secondary"
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
                        <div className="input-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Create criterion"
                                ref={(input) =>
                                    this.criterionKeyInput = input} />
                            <input type="checkbox"
                                ref={(input) =>
                                    this.criterionOrderInput = input} />
                            <input type="number"
                                ref={(input) =>
                                    this.criterionPriorityInput = input} />
                        </div>
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

    private handleClick() {
        this.props.dispatch(openModal("addCriterionDialog"));
    }

    private handleClickCreate() {
        const currentSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubject.name)[0];
        this.props.dispatch(addCriterion(currentSubject, {
            key: this.criterionKeyInput.value,
            order: this.criterionOrderInput.checked ? "asc" : "desc",
            priority: parseInt(this.criterionPriorityInput.value) as Priority
        }));
        this.handleRequestClose();
    }

    private handleRequestClose() {
        this.props.dispatch(closeModal());
        this.cleanInputs();
    }

    private cleanInputs() {
        this.criterionKeyInput.value = "";
        this.criterionOrderInput.checked = false;
        this.criterionPriorityInput.value = "";
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "addCriterionDialog"
});

export default connect(mapStateToProps)(AddCriteriaDialog);

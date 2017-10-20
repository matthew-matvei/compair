import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import * as React from "react";
import { connect } from "react-redux";

import { addCriterion, editCriterion } from "actions/criteria";
import { closeModal } from "actions/modals";
import { deleteSubject } from "actions/subjects";
import { Criterion } from "components";
import { modalStyles } from "const";
import { getSelectedSubject } from "helpers";
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
        const { isShowingModal, selectedSubjectName, subjects } = this.props;

        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects);

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

        const actions: JSX.Element[] = [
            <FlatButton
                label="Delete"
                secondary
                onClick={this.handleClickDelete.bind(this)} />,
            <FlatButton
                label="Close"
                onClick={this.handleRequestClose.bind(this)} />,
            <FlatButton
                label="Add"
                primary
                onClick={this.handleClickAdd.bind(this)} />
        ];

        return <Dialog
            title={`Add a criterion - ${selectedSubjectName}`}
            open={isShowingModal}
            contentStyle={modalStyles}
            actions={actions}
            onRequestClose={this.handleRequestClose.bind(this)}
            modal={false}
            autoScrollBodyContent>
            <Criterion ref={(criterion) =>
                this.newCriterion = criterion!}
                newCriterion />
            <div className="card-block">
                {criteriaElements}
            </div>
        </Dialog>;
    }

    /**
     * Handles creating the new criterion on the user clicking 'create'.
     */
    private handleClickAdd() {
        const { dispatch, selectedSubjectName, subjects } = this.props;

        const criterion = this.newCriterion.state;
        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects)!;

        if (criterion.keyInputValue) {
            dispatch(addCriterion(selectedSubject, {
                key: criterion.keyInputValue,
                order: criterion.orderInputChecked ? "asc" : "desc",
                priority: (criterion.priorityInputValue || 1) as Priority
            }));
        }
    }

    /**
     * Handles deleting the subject on the user clicking 'delete'.
     */
    private handleClickDelete() {
        const selectedSubject = getSelectedSubject(
            this.props.selectedSubjectName, this.props.subjects)!;
        this.props.dispatch(deleteSubject(selectedSubject.name));
        this.handleRequestClose();
    }

    /**
     * Handles editing a criterion upon any of its values changing.
     *
     * @param criterion - The criterion to edit
     */
    private handleCriterionChange(criterion: ICriterion) {
        const selectedSubject = getSelectedSubject(
            this.props.selectedSubjectName, this.props.subjects)!;

        this.props.dispatch(editCriterion(selectedSubject, criterion));
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
    selectedSubjectName: state.selectedSubjectName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "addCriterionDialog"
});

export default connect(mapStateToProps)(AddCriteriaDialog);

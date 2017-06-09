import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import {
    addInstance,
    deleteInstance,
    setSelectedInstanceName
} from "actions/instances";
import { closeModal } from "actions/modals";
import { IKeyValue, IState } from "models";
import { IEditInstanceDialogProps } from "models/props";

class EditInstanceDialog extends React.Component<IEditInstanceDialogProps, {}> {

    private instanceNameInput: HTMLInputElement;
    private criteriaInputs: HTMLInputElement[];

    constructor(props: IEditInstanceDialogProps) {
        super(props);

        this.criteriaInputs = new Array<HTMLInputElement>();
    }

    public render(): JSX.Element {
        const selectedSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];

        const selectedInstance = selectedSubject.instances.filter(
            instance => instance.name === this.props.selectedInstanceName)[0];

        let rows: JSX.Element[] = [];
        for (let i = 0; i < selectedSubject.criteria.length; i += 2) {
            const criterion = selectedSubject.criteria[i];
            const nextCriterion = i < selectedSubject.criteria.length - 1 ?
                selectedSubject.criteria[i + 1] : null;
            const relevantKeyValue = selectedInstance &&
                selectedInstance.values.filter(
                    keyValue => keyValue.key === criterion.key)[0];
            const nextRelevantKeyValue = selectedInstance &&
                selectedInstance.values.filter(
                    keyValue => nextCriterion &&
                        keyValue.key === nextCriterion.key)[0];
            const thisElement = <div className="col-6">
                <div className="input-group">
                    <span className="input-group-addon">{criterion.key}</span>
                    <input type="number"
                        id={criterion.key}
                        value={relevantKeyValue && relevantKeyValue.value}
                        className="form-control"
                        ref={(input) => this.criteriaInputs.push(input)} />
                </div>
            </div>;
            const nextElement = nextCriterion ?
                <div className="col-6">
                    <div className="input-group">
                        <span className="input-group-addon">
                            {nextCriterion.key}
                        </span>
                        <input type="number"
                            id={nextCriterion.key}
                            value={nextRelevantKeyValue &&
                                nextRelevantKeyValue.value}
                            className="form-control"
                            ref={(input) => this.criteriaInputs.push(input)} />
                    </div>
                </div> : null;
            const row = <div className="row">
                {thisElement}
                {nextElement}
            </div>;

            rows.push(row);
        }

        return <ReactModal isOpen={this.props.isShowingModal}
            contentLabel="EditCriteraDialog"
            onRequestClose={this.handleRequestClose.bind(this)}>
            <div className="card">
                <div className="card-header text-right">
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        x
                            </button>
                </div>
                <div className="card-block">
                    {selectedInstance && <input className="form-control"
                        value={selectedInstance.name}
                        ref={(input) =>
                            this.instanceNameInput = input} />}
                </div>
                <div className="card-block">
                    {rows}
                </div>
                <div className="card-footer text-right">
                    <button className="btn btn-primary"
                        onClick={this.handleClickEdit.bind(this)}>
                        Edit
                            </button>
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        Close
                            </button>
                </div>
            </div>
        </ReactModal >;
    }

    private handleClickEdit() {
        const currentSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];
        this.props.dispatch(deleteInstance(currentSubject,
            this.props.selectedInstanceName!));
        this.props.dispatch(addInstance(currentSubject, {
            name: this.instanceNameInput.value,
            values: this.parseInputs()
        }));

        this.handleRequestClose();
    }

    private handleRequestClose() {
        this.props.dispatch(setSelectedInstanceName(null));
        this.props.dispatch(closeModal());
    }

    private parseInputs(): IKeyValue[] {
        return this.criteriaInputs.filter(input => input).map(input => ({
            key: input.id,
            value: parseInt(input.value)
        } as IKeyValue));
    }
};

const mapStateToProps = (state: IState) => ({
    selectedSubjectName: state.selectedSubjectName,
    selectedInstanceName: state.selectedInstanceName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "editInstanceDialog"
});

export default connect(mapStateToProps)(EditInstanceDialog);

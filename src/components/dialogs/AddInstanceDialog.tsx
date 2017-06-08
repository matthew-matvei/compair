import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addInstance } from "actions/instances";
import { closeModal, openModal } from "actions/modals";
import { IKeyValue, IState } from "models";
import { IAddInstanceDialogProps } from "models/props";

class AddInstanceDialog extends React.Component<IAddInstanceDialogProps, {}> {

    private instanceNameInput: HTMLInputElement;
    private criteriaInputs: HTMLInputElement[];

    constructor(props: IAddInstanceDialogProps) {
        super(props);

        this.criteriaInputs = new Array<HTMLInputElement>();
    }

    public render(): JSX.Element {
        const selectedSubject = this.props.subjects.filter(subject =>
            subject.name === this.props.selectedSubjectName)[0];
        const criteriaElements = selectedSubject.criteria.map(criterion =>
            <div className="col-12">
                <div className="input-group">
                    <span className="input-group-addon">{criterion.key}</span>
                    <input type="number"
                        id={criterion.key}
                        className="form-control"
                        ref={(input) => this.criteriaInputs.push(input)} />
                </div>
            </div>
        );

        return (
            <div>
                <div className="card-block"
                    onClick={this.handleClick.bind(this)}>
                    <p className="text-muted">Click for new instance</p>
                </div>
                <ReactModal isOpen={this.props.isShowingModal}
                    contentLabel="AddInstanceDialog"
                    onRequestClose={this.handleRequestClose.bind(this)}>
                    <div className="card">
                        <div className="card-header text-right">
                            <button className="btn btn-secondary"
                                onClick={this.handleRequestClose.bind(this)}>
                                x
                            </button>
                        </div>
                        <div className="card-block">
                            <input className="form-control"
                                placeholder="Create instance"
                                ref={(input) =>
                                    this.instanceNameInput = input} />
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
            </div>);
    }

    private handleClick() {
        this.props.dispatch(openModal("addInstanceDialog"));
    }

    private handleClickCreate() {
        const currentSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];
        this.props.dispatch(addInstance(currentSubject, {
            name: this.instanceNameInput.value,
            values: this.parseInputs()
        }));
        this.handleRequestClose();
    }

    private handleRequestClose() {
        this.props.dispatch(closeModal());
        this.cleanInputs();
    }

    private cleanInputs() {
        this.instanceNameInput.value = "";
        this.criteriaInputs = new Array<HTMLInputElement>();
    }

    private parseInputs(): IKeyValue[] {
        return this.criteriaInputs.filter(input => input).map(input => ({
            key: input.id,
            value: parseInt(input.value)
        } as IKeyValue));
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubjectName: state.selectedSubjectName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "addInstanceDialog"
});

export default connect(mapStateToProps)(AddInstanceDialog);

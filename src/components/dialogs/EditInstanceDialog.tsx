import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { setSelectedInstanceName } from "actions/instances";
import { closeModal } from "actions/modals";
import { IState } from "models";
import { IEditInstanceDialogProps } from "models/props";

class EditInstanceDialog extends React.Component<IEditInstanceDialogProps, {}> {

    private instanceNameInput: HTMLInputElement;
    private keyValueInputs: HTMLInputElement[];

    constructor(props: IEditInstanceDialogProps) {
        super(props);

        this.keyValueInputs = new Array<HTMLInputElement>();
    }

    public render(): JSX.Element {
        const selectedSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];
        const selectedInstance = selectedSubject.instances.filter(
            instance => instance.name === this.props.selectedInstanceName)[0];
        const keyValueElements = selectedInstance ? selectedInstance.values.map(
            keyValue => <div className="col-12">
                <div className="input-group">
                    <span className="input-group-addon">{keyValue.key}</span>
                    <input type="number"
                        id={keyValue.key}
                        className="form-control"
                        ref={(input) => this.keyValueInputs.push(input)} />
                </div>
            </div>
        ) : null;

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
                    {keyValueElements}
                </div>
                <div className="card-footer text-right">
                    <button className="btn btn-primary"
                        onClick={this.handleRequestClose.bind(this)}>
                        Close
                            </button>
                </div>
            </div>
        </ReactModal>;
    }

    private handleRequestClose() {
        this.props.dispatch(setSelectedInstanceName(null));
        this.props.dispatch(closeModal());
    }
};

const mapStateToProps = (state: IState) => ({
    selectedSubjectName: state.selectedSubjectName,
    selectedInstanceName: state.selectedInstanceName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "editInstanceDialog"
});

export default connect(mapStateToProps)(EditInstanceDialog);

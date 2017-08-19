import * as React from "react";
import { Icon } from "react-fa";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addInstance } from "actions/instances";
import { closeModal } from "actions/modals";
import { KeyValue } from "components";
import { dialogStyles } from "const";
import { getSelectedSubject } from "helpers";
import { IKeyValue, IState } from "models";
import { IAddInstanceDialogProps } from "models/props";

/**
 * A dialog for creating a new instance.
 */
class AddInstanceDialog extends React.Component<IAddInstanceDialogProps, {}> {

    /**
     * The text input for the new instance's name.
     */
    private instanceNameInput: HTMLInputElement;

    /**
     * A lookup to the keyValues for this instance.
     */
    private keyValues: {
        [keyName: string]: KeyValue;
    } = {};

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element | null {
        const { selectedSubjectName, subjects } = this.props;

        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects);

        if (!selectedSubject) {
            return null;
        }

        let rows: JSX.Element[] = [];
        for (let i = 0; i < selectedSubject.criteria.length; i += 2) {
            const criterion = selectedSubject.criteria[i];
            const nextCriterion = i < selectedSubject.criteria.length - 1 ?
                selectedSubject.criteria[i + 1] : null;
            const row = <div className="row pb-2">
                <KeyValue key={criterion.key}
                    keyName={criterion.key}
                    ref={(keyValueElement) => this.keyValues[criterion.key] = keyValueElement!} />
                {nextCriterion ?
                    <KeyValue key={nextCriterion.key}
                        keyName={nextCriterion.key}
                        ref={(keyValueElement) => this.keyValues[nextCriterion.key] = keyValueElement!} />
                    : null}
            </div>;

            rows.push(row);
        }

        return <ReactModal isOpen={this.props.isShowingModal}
            contentLabel="AddInstanceDialog"
            onRequestClose={this.handleRequestClose.bind(this)}
            style={dialogStyles}>
            <div className="card">
                <div className="card-header dialog-header">
                    <h2 className="card-title text-muted">
                        {`Add an instance - ${selectedSubject.name}`}
                    </h2>
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        <Icon name="close" />
                    </button>
                </div>
                <div className="card-block">
                    <input className="form-control"
                        placeholder="Instance name..."
                        ref={(input) =>
                            this.instanceNameInput = input!} />
                </div>
                <div className="card-block">
                    {rows}
                </div>
                <div className="card-footer text-right">
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
     */
    private handleClickCreate() {
        const selectedSubject = getSelectedSubject(
            this.props.selectedSubjectName, this.props.subjects
        )!;

        this.props.dispatch(addInstance(selectedSubject, {
            name: this.instanceNameInput.value,
            values: this.parseInputs()
        }));
        this.handleRequestClose();
    }

    /**
     * Handles closing the modal and nulling the modals inputs, since the
     * dialog component is not actually dismounted from the DOM.
     */
    private handleRequestClose() {
        this.props.dispatch(closeModal());
    }

    /**
     * Parses the values of the inputs and returns corresponding key values.
     *
     * @returns - Key values based on the parsed inputs
     */
    private parseInputs(): IKeyValue[] {
        return Object.keys(this.keyValues).map(key => ({
            key,
            value: this.keyValues[key].state.value || 0
        } as IKeyValue));
    }
}

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
 *
 * @param state - The central state of the application
 * @returns - This component's props, taken from the application state
 */
const mapStateToProps = (state: IState) => ({
    selectedSubjectName: state.selectedSubjectName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "addInstanceDialog"
});

export default connect(mapStateToProps)(AddInstanceDialog);

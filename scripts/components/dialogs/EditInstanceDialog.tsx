import * as React from "react";
import { Icon } from "react-fa";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import {
    addInstance,
    deleteInstance,
    setSelectedInstance
} from "actions/instances";
import { closeModal } from "actions/modals";
import { KeyValue } from "components";
import { dialogStyles } from "const";
import { IKeyValue, IState } from "models";
import { IEditInstanceDialogProps } from "models/props";

/**
 * A dialog for creating new criteria.
 */
class EditInstanceDialog extends React.Component<IEditInstanceDialogProps, {}> {

    /**
     * The text input for the instance's name.
     */
    private instanceNameInput: HTMLInputElement;

    /**
     * A lookup to the keyValues for this instance.
     */
    private keyValues: {
        [keyName: string]: KeyValue
    } = {};

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element | null {
        const { selectedInstance, selectedSubject } = this.props;

        if (!selectedSubject) {
            return null;
        }

        let rows: JSX.Element[] = [];
        for (let i = 0; i < selectedSubject.criteria.length; i += 2) {
            const criterion = selectedSubject.criteria[i];
            const nextCriterion = i < selectedSubject.criteria.length - 1 ?
                selectedSubject.criteria[i + 1] : null;
            const relevantKeyValue = selectedInstance! &&
                selectedInstance!.values.find(
                    keyValue => keyValue.key === criterion.key);
            const nextRelevantKeyValue = selectedInstance! &&
                selectedInstance!.values.find(
                    keyValue => nextCriterion !== null &&
                        keyValue.key === nextCriterion.key);

            const row = <div className="row pb-2" key={`row-${i}`}>
                <KeyValue key={criterion.key}
                    keyName={criterion.key}
                    value={relevantKeyValue && relevantKeyValue.value}
                    ref={(keyValueElement) => this.keyValues[criterion.key] = keyValueElement} />
                {nextCriterion ?
                    <KeyValue key={nextCriterion.key}
                        keyName={nextCriterion.key}
                        value={nextRelevantKeyValue && nextRelevantKeyValue.value}
                        ref={(keyValueElement) => this.keyValues[nextCriterion.key] = keyValueElement} />
                    : null}
            </div>;

            rows.push(row);
        }

        return <ReactModal isOpen={this.props.isShowingModal}
            contentLabel="EditCriteraDialog"
            onRequestClose={this.handleRequestClose.bind(this)}
            style={dialogStyles}>
            <div className="card">
                <div className="card-header dialog-header">
                    <h2 className="card-title text-muted">
                        {`Edit an instance - ${this.props.selectedSubject.name}`}
                    </h2>
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        <Icon name="close" />
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
                    <button className="btn btn-primary mr-3"
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

    /**
     * Handles editing the criterion on the user clicking 'edit'.
     */
    private handleClickEdit() {
        this.props.dispatch(deleteInstance(this.props.selectedSubject,
            this.props.selectedInstance!.name));
        this.props.dispatch(addInstance(this.props.selectedSubject, {
            name: this.instanceNameInput.value,
            values: this.parseKeyValues()
        }));

        this.handleRequestClose();
    }

    /**
     * Handles closing the modal and nulling the modals inputs, since the
     * dialog component is not actually dismounted from the DOM.
     */
    private handleRequestClose() {
        this.props.dispatch(setSelectedInstance(null));
        this.props.dispatch(closeModal());
    }

    private parseKeyValues(): IKeyValue[] {
        return Object.keys(this.keyValues).map(key => ({
            key,
            value: this.keyValues[key].state.value || 0
        } as IKeyValue));
    }
};

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
 *
 * @param state - The central state of the application
 * @returns - This component's props, taken from the application state
 */
const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject,
    selectedInstance: state.selectedInstance,
    isShowingModal: state.isShowingModal === "editInstanceDialog"
});

export default connect(mapStateToProps)(EditInstanceDialog);

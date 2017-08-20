import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { connect } from "react-redux";

import { addInstance, deleteInstance, setSelectedInstanceName } from "actions/instances";
import { closeModal } from "actions/modals";
import { KeyValue } from "components";
import { modalStyles } from "const";
import { getSelectedInstance, getSelectedSubject } from "helpers";
import { IKeyValue, IState } from "models";
import { IEditInstanceDialogProps } from "models/props";

/**
 * A dialog for creating new criteria.
 */
class EditInstanceDialog extends React.Component<IEditInstanceDialogProps, {}> {

    /**
     * The text input for the instance's name.
     */
    private instanceNameInput: TextField;

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
        const { isShowingModal, selectedInstanceName, selectedSubjectName, subjects } = this.props;

        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects)!;

        const selectedInstance = getSelectedInstance(
            selectedInstanceName, selectedSubject.instances);

        if (!selectedInstance) {
            return null;
        }

        let rows: JSX.Element[] = [];
        for (let i = 0; i < selectedSubject.criteria.length; i += 2) {
            const criterion = selectedSubject.criteria[i];
            const nextCriterion = i < selectedSubject.criteria.length - 1 ?
                selectedSubject.criteria[i + 1] : null;
            const relevantKeyValue = selectedInstance.values.find(
                keyValue => keyValue.key === criterion.key);
            const nextRelevantKeyValue = selectedInstance.values.find(
                keyValue => nextCriterion !== null &&
                    keyValue.key === nextCriterion.key);

            const row = <div className="row pb-2" key={`row-${i}`}>
                <KeyValue key={criterion.key}
                    keyName={criterion.key}
                    value={relevantKeyValue && relevantKeyValue.value}
                    ref={(keyValueElement) => this.keyValues[criterion.key] = keyValueElement!} />
                {nextCriterion ?
                    <KeyValue key={nextCriterion.key}
                        keyName={nextCriterion.key}
                        value={nextRelevantKeyValue && nextRelevantKeyValue.value}
                        ref={(keyValueElement) => this.keyValues[nextCriterion.key] = keyValueElement!} />
                    : null}
            </div>;

            rows.push(row);
        }

        const actions: JSX.Element[] = [
            <FlatButton
                label="Cancel"
                onClick={this.handleRequestClose.bind(this)} />,
            <FlatButton
                label="Edit"
                primary
                onClick={this.handleClickEdit.bind(this)} />
        ];

        return <Dialog
            title={`Add an instance - ${selectedSubject.name}`}
            open={isShowingModal}
            onRequestClose={this.handleRequestClose.bind(this)}
            contentStyle={modalStyles}
            actions={actions}
            modal={false}
            autoScrollBodyContent>
            <div>
                {selectedInstanceName && <TextField
                    floatingLabelText="Instance name"
                    value={selectedInstance.name}
                    ref={(input) =>
                        this.instanceNameInput = input!} />}
            </div>
            <div>
                {rows}
            </div>
        </Dialog>;
    }

    /**
     * Handles editing the criterion on the user clicking 'edit'.
     */
    private handleClickEdit() {
        const { selectedInstanceName, selectedSubjectName, subjects } = this.props;

        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects)!;
        const selectedInstance = getSelectedInstance(
            selectedInstanceName, selectedSubject.instances);

        this.props.dispatch(deleteInstance(selectedSubject, selectedInstance!.name));
        this.props.dispatch(addInstance(selectedSubject, {
            name: this.instanceNameInput.getValue(),
            values: this.parseKeyValues()
        }));

        this.handleRequestClose();
    }

    /**
     * Handles closing the modal and nulling the modals inputs, since the
     * dialog component is not actually dismounted from the DOM.
     */
    private handleRequestClose() {
        this.props.dispatch(setSelectedInstanceName(null));
        this.props.dispatch(closeModal());
    }

    /**
     * Parses and returns the keyValues in this dialog's inputs.
     */
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
    selectedSubjectName: state.selectedSubjectName,
    selectedInstanceName: state.selectedInstanceName,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal === "editInstanceDialog"
});

export default connect(mapStateToProps)(EditInstanceDialog);

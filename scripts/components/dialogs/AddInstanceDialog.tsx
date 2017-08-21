import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { GridList, GridTile } from "material-ui/GridList";
import TextField from "material-ui/TextField";
import * as React from "react";
import { connect } from "react-redux";

import { addInstance } from "actions/instances";
import { closeModal } from "actions/modals";
import { KeyValue } from "components";
import { modalStyles } from "const";
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
    private instanceNameInput: TextField;

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
        const { isShowingModal, selectedSubjectName, subjects } = this.props;

        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects);

        if (!selectedSubject) {
            return null;
        }

        const keyValueTiles = selectedSubject.criteria.map(criterion => {
            return <GridTile key={criterion.key}>
                <KeyValue
                    keyName={criterion.key}
                    ref={(keyValueElement) => this.keyValues[criterion.key] = keyValueElement!} />
            </GridTile>;
        });

        const actions: JSX.Element[] = [
            <FlatButton
                label="Cancel"
                onClick={this.handleRequestClose.bind(this)} />,
            <FlatButton
                label="Create"
                primary
                onClick={this.handleClickCreate.bind(this)} />
        ];

        return <Dialog
            title={`Add an instance - ${selectedSubject.name}`}
            open={isShowingModal}
            onRequestClose={this.handleRequestClose.bind(this)}
            contentStyle={modalStyles}
            actions={actions}
            modal={false}
            autoScrollBodyContent>
            <TextField
                floatingLabelText="Instance name"
                ref={(input) => {
                    this.instanceNameInput = input!;
                    input && input.focus();
                }} />
            <GridList cellHeight="auto" cols={3}>
                {keyValueTiles}
            </GridList>
        </Dialog>;
    }

    /**
     * Handles creating the new criterion on the user clicking 'create'.
     */
    private handleClickCreate() {
        const selectedSubject = getSelectedSubject(
            this.props.selectedSubjectName, this.props.subjects
        )!;

        this.props.dispatch(addInstance(selectedSubject, {
            name: this.instanceNameInput.getValue(),
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

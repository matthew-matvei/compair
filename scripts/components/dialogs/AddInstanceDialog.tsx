import * as React from "react";
import { Icon } from "react-fa";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { addInstance } from "actions/instances";
import { closeModal } from "actions/modals";
import { dialogStyles } from "const";
import { IKeyValue, IState } from "models";
import { IAddInstanceDialogProps } from "models/props";

/**
 * A dialog for creating a new instance.
 *
 * @class AddInstanceDialog
 * @extends {React.Component<IAddInstanceDialogProps, {}>}
 */
class AddInstanceDialog extends React.Component<IAddInstanceDialogProps, {}> {

    /**
     * The text input for the new instance's name.
     *
     * @private
     * @type {HTMLInputElement}
     * @memberof AddInstanceDialog
     */
    private instanceNameInput: HTMLInputElement;

    /**
     * An array of the number inputs for the instance's key values.
     *
     * @private
     * @type {HTMLInputElement[]}
     * @memberof AddInstanceDialog
     */
    private criteriaInputs: HTMLInputElement[];

    /**
     * Creates an instance of AddInstanceDialog.
     * @param {IAddInstanceDialogProps} props - The props for this component
     *
     * @memberof AddInstanceDialog
     */
    constructor(props: IAddInstanceDialogProps) {
        super(props);

        this.criteriaInputs = new Array<HTMLInputElement>();
    }

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element | null} - The JSX required to create this component
     *
     * @memberof AddInstanceDialog
     */
    public render(): JSX.Element | null {
        const selectedSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName);

        if (!selectedSubject) {
            return null;
        }

        let rows: JSX.Element[] = [];
        for (let i = 0; i < selectedSubject.criteria.length; i += 2) {
            const criterion = selectedSubject.criteria[i];
            const nextCriterion = i < selectedSubject.criteria.length - 1 ?
                selectedSubject.criteria[i + 1] : null;
            const thisElement = <div className="col-6">
                <div className="input-group">
                    <span className="input-group-addon">{criterion.key}</span>
                    <input type="number"
                        id={criterion.key}
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
                            className="form-control"
                            ref={(input) => this.criteriaInputs.push(input)} />
                    </div>
                </div> : null;
            const row = <div className="row pb-2">
                {thisElement}
                {nextElement}
            </div>;

            rows.push(row);
        }

        return (
            <ReactModal isOpen={this.props.isShowingModal}
                contentLabel="AddInstanceDialog"
                onRequestClose={this.handleRequestClose.bind(this)}
                style={dialogStyles}>
                <div className="card">
                    <div className="card-header text-right">
                        <button className="btn btn-secondary"
                            onClick={this.handleRequestClose.bind(this)}>
                            <Icon name="close" />
                        </button>
                    </div>
                    <div className="card-block">
                        <input className="form-control"
                            placeholder="Create instance"
                            ref={(input) =>
                                this.instanceNameInput = input} />
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
            </ReactModal>);
    }

    /**
     * Handles creating the new criterion on the user clicking 'create'.
     *
     * @private
     *
     * @memberof AddInstanceDialog
     */
    private handleClickCreate() {
        const currentSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName)!;
        this.props.dispatch(addInstance(currentSubject, {
            name: this.instanceNameInput.value,
            values: this.parseInputs()
        }));
        this.handleRequestClose();
    }

    /**
     * Handles closing the modal and nulling the modals inputs, since the
     * dialog component is not actually dismounted from the DOM.
     *
     * @private
     *
     * @memberof AddInstanceDialog
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
     * @memberof AddInstanceDialog
     */
    private cleanInputs() {
        this.instanceNameInput.value = "";
        this.criteriaInputs = new Array<HTMLInputElement>();
    }

    /**
     * Parses the values of the inputs and returns corresponding key values.
     *
     * @private
     * @returns {IKeyValue[]} - Key values based on the parsed inputs
     *
     * @memberof AddInstanceDialog
     */
    private parseInputs(): IKeyValue[] {
        return this.criteriaInputs.filter(input => input).map(input => ({
            key: input.id,
            value: parseInt(input.value)
        } as IKeyValue));
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
    isShowingModal: state.isShowingModal === "addInstanceDialog"
});

export default connect(mapStateToProps)(AddInstanceDialog);

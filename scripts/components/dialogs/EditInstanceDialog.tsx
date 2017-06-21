import * as React from "react";
import { Icon } from "react-fa";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import {
    addInstance,
    deleteInstance,
    setSelectedInstanceName
} from "actions/instances";
import { closeModal } from "actions/modals";
import { dialogStyles } from "const";
import { IKeyValue, IState } from "models";
import { IEditInstanceDialogProps } from "models/props";

/**
 * A dialog for creating new criteria.
 *
 * @class EditInstanceDialog
 * @extends {React.Component<IEditInstanceDialogProps, {}>}
 */
class EditInstanceDialog extends React.Component<IEditInstanceDialogProps, {}> {

    /**
     * The text input for the instance's name.
     *
     * @private
     * @type {HTMLInputElement}
     * @memberof EditInstanceDialog
     */
    private instanceNameInput: HTMLInputElement;

    /**
     * An array of the number inputs for the instance's key values.
     *
     * @private
     * @type {HTMLInputElement[]}
     * @memberof EditInstanceDialog
     */
    private criteriaInputs: HTMLInputElement[];

    /**
     * Creates an instance of EditInstanceDialog.
     * @param {IEditInstanceDialogProps} props - The props for this component
     *
     * @memberof EditInstanceDialog
     */
    constructor(props: IEditInstanceDialogProps) {
        super(props);

        this.criteriaInputs = new Array<HTMLInputElement>();
    }

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element | null} - The JSX required to create this component
     *
     * @memberof EditInstanceDialog
     */
    public render(): JSX.Element | null {
        const selectedSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName);

        if (!selectedSubject) {
            return null;
        }

        const selectedInstance = selectedSubject.instances.find(
            instance => instance.name === this.props.selectedInstanceName);

        let rows: JSX.Element[] = [];
        for (let i = 0; i < selectedSubject.criteria.length; i += 2) {
            const criterion = selectedSubject.criteria[i];
            const nextCriterion = i < selectedSubject.criteria.length - 1 ?
                selectedSubject.criteria[i + 1] : null;
            const relevantKeyValue = selectedInstance &&
                selectedInstance.values.find(
                    keyValue => keyValue.key === criterion.key);
            const nextRelevantKeyValue = selectedInstance &&
                selectedInstance.values.find(
                    keyValue => {
                        if (nextCriterion) {
                            return keyValue.key === nextCriterion.key;
                        }

                        return false;
                    });
            const thisElement = <div className="col-6" key={criterion.key}>
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
                <div className="col-6" key={nextCriterion.key}>
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
            const row = <div className="row pb-2" key={`row-${i}`}>
                {thisElement}
                {nextElement}
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
                        {`Edit an instance - ${this.props.selectedSubjectName}`}
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
     *
     * @private
     *
     * @memberof EditInstanceDialog
     */
    private handleClickEdit() {
        const currentSubject = this.props.subjects.find(
            subject => subject.name === this.props.selectedSubjectName)!;
        this.props.dispatch(deleteInstance(currentSubject,
            this.props.selectedInstanceName!));
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
     * @memberof EditInstanceDialog
     */
    private handleRequestClose() {
        this.props.dispatch(setSelectedInstanceName(null));
        this.props.dispatch(closeModal());
    }

    /**
     * Parses the values of the inputs and returns corresponding key values.
     *
     * @private
     * @returns {IKeyValue[]} - Key values based on the parsed inputs
     *
     * @memberof EditInstanceDialog
     */
    private parseInputs(): IKeyValue[] {
        return this.criteriaInputs.filter(input => input).map(input => ({
            key: input.id,
            value: parseInt(input.value)
        } as IKeyValue));
    }
};

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
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

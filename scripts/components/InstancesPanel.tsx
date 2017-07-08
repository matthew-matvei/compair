import * as React from "react";
import { connect } from "react-redux";

import { deleteInstance, setSelectedInstance } from "actions/instances";
import { openModal } from "actions/modals";
import { setSelectedSubject } from "actions/subjects";
import { orderInstances } from "helpers";
import { IInstance, IState } from "models";
import { IInstancesPanelProps } from "models/props";
import { InstanceCard } from ".";

/**
 * The panel containing all the current instances in the application.
 */
class InstancesPanel extends React.Component<IInstancesPanelProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element | null {
        const { selectedSubject } = this.props;

        if (!selectedSubject) {
            return null;
        }

        const instanceElements = orderInstances(
            selectedSubject.criteria, selectedSubject.instances)
            .map(instance =>
                <InstanceCard instance={instance}
                    key={instance.name}
                    currentSubject={selectedSubject}
                    deleteInstance={this.handleDeleteInstance.bind(this)}
                    editInstance={this.handleEditInstance.bind(this)} />);

        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            <div className="row">
                {instanceElements}
                <InstanceCard instance={null}
                    currentSubject={null}
                    openDialog={this.handleOpenDialog.bind(this)} />
            </div>
        </main>;
    }

    /**
     * Determines whether this component should update. It also handles getting the
     * properly updated selected subject from nextProps.subjects.
     *
     * @param nextProps - the incoming props
     * @returns - whether this component should update or not
     */
    public shouldComponentUpdate(nextProps: IInstancesPanelProps): boolean {

        // since nextProps.selectedSubject does not represent the properly updated subject,
        // it must be gotten from nextProps.subjects
        const updatedSelectedSubject = nextProps.subjects.find(
            subject => subject.name === this.props.selectedSubject.name)!;

        this.props.dispatch(setSelectedSubject(updatedSelectedSubject));

        if (this.props.selectedSubject.instances.length !==
            updatedSelectedSubject.instances.length) {

            return true;
        }

        for (let i = 0; i < this.props.selectedSubject.instances.length; i++) {
            const oldInstance = this.props.selectedSubject.instances[i];
            const newInstance = updatedSelectedSubject.instances[i];

            if (oldInstance.score !== newInstance.score) {
                return true;
            }
        }

        return false;
    }

    /**
     * Handles deleting the given instance.
     */
    private handleDeleteInstance(instance: IInstance) {
        this.props.dispatch(deleteInstance(this.props.selectedSubject, instance.name));
    }

    /**
     * Handles editing the given instance.
     */
    private handleEditInstance(instance: IInstance) {
        this.props.dispatch(setSelectedInstance(instance));
        this.props.dispatch(openModal("editInstanceDialog"));
    }

    /**
     * Handles opening the addInstanceDialog.
     */
    private handleOpenDialog() {
        this.props.dispatch(openModal("addInstanceDialog"));
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
    selectedSubject: state.selectedSubject,
    subjects: state.subjects
});

export default connect(mapStateToProps)(InstancesPanel);

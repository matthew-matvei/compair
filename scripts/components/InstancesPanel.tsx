import { GridList } from "material-ui/GridList";
import Paper from "material-ui/Paper";
import { grey200, grey50, grey500 } from "material-ui/styles/colors";
import Subheader from "material-ui/Subheader";
import * as React from "react";
import { connect } from "react-redux";

import { deleteInstance, setSelectedInstanceName } from "actions/instances";
import { openModal } from "actions/modals";
import { getSelectedSubject, orderInstances } from "helpers";
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
        const { selectedSubjectName, subjects } = this.props;

        const selectedSubject = getSelectedSubject(selectedSubjectName, subjects);

        if (!selectedSubject) {
            return <main
                className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3 main-section"
                style={{ background: grey200 }}>
                <Paper zDepth={2} style={{ background: grey50 }}>
                    <h3 style={{ padding: "1em", margin: "1em", color: grey500 }}>
                        Choose a subject on the left, or make a new one
                    </h3>
                </Paper>
            </main>;
        }

        const instanceElements = orderInstances(
            selectedSubject.criteria, selectedSubject.instances)
            .map(instance =>
                <InstanceCard instance={instance}
                    key={instance.name}
                    currentSubject={selectedSubject}
                    deleteInstance={this.handleDeleteInstance.bind(this)}
                    editInstance={this.handleEditInstance.bind(this)} />);

        return <main
            className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3 main-section"
            style={{ background: grey200 }}>
            <GridList padding={5} cellHeight="auto" cols={3}>
                <Subheader>Instances - {selectedSubject.name}</Subheader>
                {instanceElements}
                <InstanceCard instance={null}
                    currentSubject={null}
                    openDialog={this.handleOpenDialog.bind(this)} />
            </GridList>
        </main>;
    }

    /**
     * Handles deleting the given instance.
     */
    private handleDeleteInstance(instance: IInstance) {
        const selectedSubject = getSelectedSubject(
            this.props.selectedSubjectName, this.props.subjects)!;
        this.props.dispatch(deleteInstance(selectedSubject, instance.name));
    }

    /**
     * Handles editing the given instance.
     */
    private handleEditInstance(instance: IInstance) {
        this.props.dispatch(setSelectedInstanceName(instance.name));
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
    selectedSubjectName: state.selectedSubjectName,
    subjects: state.subjects
});

export default connect(mapStateToProps)(InstancesPanel);

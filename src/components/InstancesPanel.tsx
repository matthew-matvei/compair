import * as React from "react";
import { connect } from "react-redux";

import { deleteInstance } from "actions/instances";
import { orderInstances } from "helpers";
import { IInstance, IState } from "models";
import { IInstancesPanelProps } from "models/props";
import { InstanceCard } from ".";

class InstancesPanel extends React.Component<IInstancesPanelProps, {}> {

    public render(): JSX.Element {
        const selectedSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];
        const instanceElements = orderInstances(
            selectedSubject.criteria, selectedSubject.instances)
            .map(instance =>
                <InstanceCard instance={instance}
                    currentSubject={selectedSubject}
                    deleteInstance={this.handleDeleteInstance.bind(this)} />);

        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            <div className="row">
                {instanceElements}
                <InstanceCard instance={null} currentSubject={null} />
            </div>
        </main>;
    }

    private handleDeleteInstance(instance: IInstance) {
        const selectedSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubjectName)[0];
        this.props.dispatch(deleteInstance(selectedSubject, instance.name));
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubjectName: state.selectedSubjectName,
    subjects: state.subjects
});

export default connect(mapStateToProps)(InstancesPanel);

import * as React from "react";
import { connect } from "react-redux";

import { orderInstances } from "helpers";
import { IState } from "models";
import { IInstancesPanelProps } from "models/props";
import { InstanceCard } from ".";

class InstancesPanel extends React.Component<IInstancesPanelProps, {}> {

    public render(): JSX.Element {
        const selectedSubject = this.props.subjects.filter(
            subject => subject.name === this.props.selectedSubject.name)[0];
        const instanceElements = orderInstances(
            selectedSubject.criteria, selectedSubject.instances)
            .map(instance =>
                <InstanceCard instance={instance}
                    currentSubject={this.props.selectedSubject} />);

        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            <div className="row">
                {instanceElements}
                <InstanceCard instance={null} currentSubject={null} />
            </div>
        </main>;
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject,
    subjects: state.subjects
});

export default connect(mapStateToProps)(InstancesPanel);

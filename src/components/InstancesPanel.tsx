import * as React from "react";
import { connect } from "react-redux";

import { IState } from "models";
import { IInstancesPanelProps } from "models/props";
import { InstanceCard } from ".";

class InstancesPanel extends React.Component<IInstancesPanelProps, {}> {

    public render(): JSX.Element {
        const selectedItem = this.props.instanceStore.items.filter(
            item => item.subjectName === this.props.selectedSubject.name)[0] ||
            [];
        const instanceElements = selectedItem.instances.map(instance =>
            <InstanceCard instance={instance} />);

        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            <div className="row">
                {instanceElements}
                <InstanceCard instance={null} />
            </div>
        </main>;
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject,
    instanceStore: state.instanceStore
});

export default connect(mapStateToProps)(InstancesPanel);

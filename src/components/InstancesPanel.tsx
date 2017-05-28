import * as React from "react";
import { connect } from "react-redux";

import { IState } from "models";
import { IInstancesPanelProps } from "models/props";

class InstancesPanel extends React.Component<IInstancesPanelProps, {}> {

    public render(): JSX.Element {
        const selectedItem = this.props.instanceStore.items.filter(
            item => item.subjectName === this.props.selectedSubject.name)[0] ||
            [];
        const instanceElements = selectedItem.instances.map(instance =>
            <p>instance.name</p>);

        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            {instanceElements}
        </main>;
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject,
    instanceStore: state.instanceStore
});

export default connect(mapStateToProps)(InstancesPanel);

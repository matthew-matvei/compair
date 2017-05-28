import * as React from "react";
import { connect } from "react-redux";

import { IState } from "models";
import { IInstancesPanelProps } from "models/props";

class InstancesPanel extends React.Component<IInstancesPanelProps, {}> {

    public render(): JSX.Element {
        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            Instances
        </main>;
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject
});

export default connect(mapStateToProps)(InstancesPanel);

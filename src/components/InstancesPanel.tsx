import * as React from "react";

import { IInstancesPanelProps } from "models/props";

export default class InstancesPanel extends
    React.Component<IInstancesPanelProps, {}> {

    public render(): JSX.Element {
        return <main className="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
            Instances
        </main>;
    }
}

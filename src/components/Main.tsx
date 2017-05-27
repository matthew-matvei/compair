import * as React from "react";

import { IMainProps } from "models/props";
import { InstancesPanel, SubjectsPanel } from ".";

export default class Main extends React.Component<IMainProps, {}> {

    public render(): JSX.Element {
        return <div className="container-fluid">
            <div className="row">
                <SubjectsPanel />
                <InstancesPanel />
            </div>
        </div>;
    }
}

import * as React from "react";

import { IMainProps } from "models/props";
import { InstancesPanel, SubjectsPanel } from ".";

/**
 * The main, body section of the application.
 */
export default class Main extends React.Component<IMainProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        return <div className="container-fluid">
            <div className="row">
                <SubjectsPanel />
                <InstancesPanel />
            </div>
        </div>;
    }
}
